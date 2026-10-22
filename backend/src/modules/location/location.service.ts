import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as https from 'https';
import { Location } from '../../database/entities/location.entity';
import {
  CreateLocationDto,
  UpdateLocationDto,
  QueryLocationDto,
  ResolveLocationCoordinateDto,
} from './dto/location.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';

@Injectable()
export class LocationService {
  private readonly amapKey =
    process.env.AMAP_WEB_KEY?.trim() || '';
  private readonly amapSecurityJsCode =
    process.env.AMAP_SECURITY_JSCODE?.trim() || '';

  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const payload = await this.prepareLocationPayload(createLocationDto);
    const location = this.locationRepository.create(payload);
    return await this.locationRepository.save(location);
  }

  async findAll(
    queryDto: QueryLocationDto,
  ): Promise<PaginatedResponseDto<Location>> {
    const { page, pageSize, keyword, status } = queryDto;

    const where: any = {};
    if (status !== undefined) where.status = status;
    if (keyword) {
      where.name = Like(`%${keyword}%`);
    }

    const [items, total] = await this.locationRepository.findAndCount({
      where,
      order: { sort: 'ASC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new NotFoundException('地理位置不存在');
    }
    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.findOne(id);
    const payload = await this.prepareLocationPayload(updateLocationDto, location);
    Object.assign(location, payload);
    return await this.locationRepository.save(location);
  }

  async resolveCoordinate(dto: ResolveLocationCoordinateDto) {
    const coordinate = await this.resolveCoordinateByAddress(dto);
    return {
      ...coordinate,
      address: dto.address?.trim() || '',
      pointName: dto.pointName?.trim() || dto.name?.trim() || '',
    };
  }

  async getTeamMapList() {
    const items = await this.locationRepository.find({
      where: { status: 1 },
      order: { sort: 'ASC', createdAt: 'DESC' },
    });

    return items.map((item) => ({
      unitName: item.name,
      pointName: item.pointName || item.name,
      address: item.address,
      phone: item.phone,
      lng: Number(item.longitude),
      lat: Number(item.latitude),
    }));
  }

  async remove(id: number): Promise<void> {
    const location = await this.findOne(id);
    await this.locationRepository.softRemove(location);
  }

  async batchDelete(ids: number[]): Promise<void> {
    await this.locationRepository.softDelete(ids);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.locationRepository.update(ids, { status });
  }

  private async prepareLocationPayload(
    payload: CreateLocationDto | UpdateLocationDto,
    currentLocation?: Location,
  ) {
    const normalizedPayload: Record<string, unknown> =
      this.normalizeLocationPayload(payload);
    const mergedData = {
      name: `${normalizedPayload.name ?? currentLocation?.name ?? ''}`.trim(),
      pointName: `${normalizedPayload.pointName ?? currentLocation?.pointName ?? ''}`.trim(),
      address: `${normalizedPayload.address ?? currentLocation?.address ?? ''}`.trim(),
    };
    const explicitLongitude = this.getCoordinateNumber(
      normalizedPayload.longitude,
    );
    const explicitLatitude = this.getCoordinateNumber(
      normalizedPayload.latitude,
    );
    const hasExplicitCoordinate =
      explicitLongitude !== undefined && explicitLatitude !== undefined;
    const textChanged = this.hasLocationTextChanged(normalizedPayload, currentLocation);
    const explicitCoordinateMatchesCurrent =
      hasExplicitCoordinate &&
      !!currentLocation &&
      Number(currentLocation.longitude) === explicitLongitude &&
      Number(currentLocation.latitude) === explicitLatitude;

    if (!mergedData.address) {
      throw new BadRequestException('请填写详细地址');
    }

    if (hasExplicitCoordinate && !(textChanged && explicitCoordinateMatchesCurrent)) {
      normalizedPayload.longitude = explicitLongitude;
      normalizedPayload.latitude = explicitLatitude;
      return normalizedPayload;
    }

    if (!currentLocation || textChanged) {
      const coordinate = await this.resolveCoordinateByAddress(mergedData);
      normalizedPayload.longitude = coordinate.lng;
      normalizedPayload.latitude = coordinate.lat;
      return normalizedPayload;
    }

    if (
      this.getCoordinateNumber(currentLocation.longitude) !== undefined &&
      this.getCoordinateNumber(currentLocation.latitude) !== undefined
    ) {
      normalizedPayload.longitude = Number(currentLocation.longitude);
      normalizedPayload.latitude = Number(currentLocation.latitude);
      return normalizedPayload;
    }

    const coordinate = await this.resolveCoordinateByAddress(mergedData);
    normalizedPayload.longitude = coordinate.lng;
    normalizedPayload.latitude = coordinate.lat;
    return normalizedPayload;
  }

  private normalizeLocationPayload(
    payload: CreateLocationDto | UpdateLocationDto,
  ) {
    const normalizedPayload: Record<string, unknown> = { ...payload };

    if (payload.lng !== undefined) {
      normalizedPayload.longitude = Number(payload.lng);
    }

    if (payload.lat !== undefined) {
      normalizedPayload.latitude = Number(payload.lat);
    }

    delete normalizedPayload.lng;
    delete normalizedPayload.lat;

    return normalizedPayload;
  }

  private hasLocationTextChanged(
    payload: Record<string, unknown>,
    currentLocation?: Location,
  ) {
    if (!currentLocation) return true;

    return ['name', 'pointName', 'address'].some((field) => {
      const nextValue = `${payload[field] ?? (currentLocation as any)[field] ?? ''}`.trim();
      const currentValue = `${(currentLocation as any)[field] ?? ''}`.trim();
      return nextValue !== currentValue;
    });
  }

  private getCoordinateNumber(value: unknown) {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed === 0) {
      return undefined;
    }

    return parsed;
  }

  private buildGeocodeKeyword(data: {
    name?: string;
    pointName?: string;
    address?: string;
  }) {
    // 高德地理编码对「地址+点位名/单位名」混合关键词会稳定报 30001
    // ENGINE_RESPONSE_DATA_ERROR（实测对照），有地址时必须只用地址；
    // 无地址时才退回 点位名+单位名
    const address = data.address?.trim();
    if (address) return address;
    return [data.pointName?.trim(), data.name?.trim()]
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  private async resolveCoordinateByAddress(data: {
    name?: string;
    pointName?: string;
    address?: string;
  }) {
    const address = data.address?.trim();
    if (!address) {
      throw new BadRequestException('请填写详细地址后再解析坐标');
    }
    if (!this.amapKey) {
      throw new BadRequestException(
        '后端未配置高德 Web 服务 Key，请配置 AMAP_WEB_KEY，或使用已加白名单域名打开后台让前端自动解析坐标',
      );
    }

    const keyword = this.buildGeocodeKeyword(data);
    const url = new URL('https://restapi.amap.com/v3/geocode/geo');
    url.searchParams.set('key', this.amapKey);
    if (this.amapSecurityJsCode) {
      url.searchParams.set('jscode', this.amapSecurityJsCode);
    }
    url.searchParams.set('address', keyword);

    // 高德个人 Key QPS 很低（易撞 10021 CUQPS_HAS_EXCEEDED_THE_LIMIT 限流），
    // 且 10005 ENGINE_RESPONSE_DATA_ERROR 等为瞬时故障：统一退避重试，
    // 避免把原始 infocode 直接透传成用户的报错 toast
    const maxAttempts = 3;
    let payload: any = null;
    let lastError = '';

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const response = await new Promise<string>((resolve, reject) => {
        const request = https.get(url, (res) => {
          let raw = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            raw += chunk;
          });
          res.on('end', () => resolve(raw));
        });

        request.on('error', (error) => {
          reject(error);
        });

        request.setTimeout(6000, () => {
          request.destroy(new Error('地图解析超时'));
        });
      }).catch((error: Error) => {
        lastError = error.message || '地图解析失败';
        return '';
      });

      if (response) {
        try {
          payload = JSON.parse(response);
        } catch {
          payload = null;
          lastError = '地图解析返回异常';
        }
      }

      if (payload?.status === '1') break;
      if (attempt < maxAttempts && this.isTransientAmapFailure(payload)) {
        await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 600 : 1500));
        continue;
      }
      break;
    }

    if (payload?.infocode === '10009' || payload?.info === 'USERKEY_PLAT_NOMATCH') {
      throw new BadRequestException(
        '后端高德解析未开通 Web 服务权限，请先配置高德 Web 服务 Key，或使用已加白名单域名打开后台让前端自动解析坐标',
      );
    }
    if (!payload) {
      throw new BadRequestException(lastError || '地图解析失败，请稍后重试');
    }
    if (payload?.status !== '1' && this.isTransientAmapFailure(payload)) {
      throw new BadRequestException(
        '高德服务繁忙或暂时异常，已自动重试仍失败，请稍后重试，或手动填写经纬度',
      );
    }
    if (
      !Array.isArray(payload?.geocodes) ||
      !payload.geocodes.length
    ) {
      throw new BadRequestException(
        '未解析到该地址坐标，请补充更精准的详细地址，或手动填写经纬度',
      );
    }

    const location = `${payload.geocodes[0]?.location || ''}`.split(',');
    const lng = Number(location[0]);
    const lat = Number(location[1]);

    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      throw new BadRequestException('解析到的坐标无效，请检查详细地址');
    }

    return { lng, lat };
  }

  /** 高德瞬时故障（限流/引擎异常/网络抖动）判定：可安全重试 */
  private isTransientAmapFailure(payload: any): boolean {
    if (!payload) return true; // 网络异常 / 超时 / 响应非 JSON
    const code = `${payload.infocode || ''}`;
    const info = `${payload.info || ''}`;
    return (
      ['10005', '10019', '10020', '10021'].includes(code) ||
      /EXCEEDED_THE_LIMIT|ENGINE_RESPONSE/i.test(info)
    );
  }
}
