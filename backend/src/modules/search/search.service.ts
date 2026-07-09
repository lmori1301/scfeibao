import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { News } from '../../database/entities/news.entity'
import { Policy } from '../policies/entities/policy.entity'
import { RescueCase } from '../team-building/entities/rescue-case.entity'
import { TeamShowcase } from '../team-building/entities/team-showcase.entity'
import { PartyWork } from '../party-building/entities/party-work.entity'
import { PartyMember } from '../party-building/entities/party-member.entity'
import { Leadership } from '../overview-info/entities/leadership.entity'
import { PublicInfo } from '../info-public/entities/public-info.entity'

export interface SearchResultItem {
  module: string
  title: string
  description: string
  date: Date | string | null
  link: string
}

export interface SearchResultData {
  list: SearchResultItem[]
  total: number
  keyword: string
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    @InjectRepository(RescueCase)
    private readonly rescueCaseRepository: Repository<RescueCase>,
    @InjectRepository(TeamShowcase)
    private readonly teamShowcaseRepository: Repository<TeamShowcase>,
    @InjectRepository(PartyWork)
    private readonly partyWorkRepository: Repository<PartyWork>,
    @InjectRepository(PartyMember)
    private readonly partyMemberRepository: Repository<PartyMember>,
    @InjectRepository(Leadership)
    private readonly leadershipRepository: Repository<Leadership>,
    @InjectRepository(PublicInfo)
    private readonly publicInfoRepository: Repository<PublicInfo>,
  ) {}

  async search(keyword: string, limit: number = 50): Promise<SearchResultData> {
    const text = keyword.trim()
    if (!text) {
      return { list: [], total: 0, keyword: text }
    }

    const like = Like(`%${text}%`)
    const take = Math.max(1, Math.min(limit, 100))

    const [news, policies, rescueCases, showcases, partyWorks, partyMembers, leadership, publicInfos] = await Promise.all([
      this.newsRepository.find({
        where: [{ title: like }, { summary: like }, { content: like }],
        order: { publishedAt: 'DESC', createdAt: 'DESC' },
        take,
      }),
      this.policyRepository.find({
        where: [{ title: like }, { summary: like }, { content: like }],
        order: { publishedAt: 'DESC', createdAt: 'DESC' },
        take,
      }),
      this.rescueCaseRepository.find({
        where: [{ title: like }, { content: like }, { location: like }],
        order: { rescueDate: 'DESC', createdAt: 'DESC' },
        take,
      }),
      this.teamShowcaseRepository.find({
        where: [{ title: like }, { description: like }],
        order: { sort: 'ASC', createdAt: 'DESC' },
        take,
      }),
      this.partyWorkRepository.find({
        where: [{ title: like }, { summary: like }, { content: like }],
        order: { publishDate: 'DESC', createdAt: 'DESC' },
        take,
      }),
      this.partyMemberRepository.find({
        where: [{ name: like }, { position: like }, { description: like }],
        order: { sort: 'ASC', id: 'ASC' },
        take,
      }),
      this.leadershipRepository.find({
        where: [{ name: like }, { position: like }, { duty: like }],
        order: { sort: 'ASC', id: 'ASC' },
        take,
      }),
      this.publicInfoRepository.find({
        where: [{ title: like }, { content: like }, { category: like }],
        order: { publishDate: 'DESC', createdAt: 'DESC' },
        take,
      }),
    ])

    const list: SearchResultItem[] = [
      ...news.map((item) => ({
        module: '动态要闻',
        title: item.title,
        description: item.summary || this.excerpt(item.content),
        date: item.publishedAt || item.createdAt,
        link: `/dynamic-news/${item.id}`,
      })),
      ...policies.map((item) => ({
        module: '政策法规',
        title: item.title,
        description: item.summary || this.excerpt(item.content),
        date: item.publishedAt || item.publishDate || item.createdAt,
        link: `/policy-regulations/laws/${item.id}`,
      })),
      ...rescueCases.map((item) => ({
        module: '队伍建设',
        title: item.title,
        description: this.excerpt(item.content || item.location),
        date: item.rescueDate || item.createdAt,
        link: `/team-building/cases/${item.id}`,
      })),
      ...showcases.map((item) => ({
        module: '队伍建设',
        title: item.title,
        description: item.description || '',
        date: item.createdAt,
        link: `/team-building/showcase/${item.id}`,
      })),
      ...partyWorks.map((item) => ({
        module: '党建专栏',
        title: item.title,
        description: item.summary || this.excerpt(item.content),
        date: item.publishDate || item.createdAt,
        link: this.partyLink(item),
      })),
      ...partyMembers.map((item) => ({
        module: '党建专栏',
        title: item.name,
        description: item.description || item.position || '',
        date: null,
        link: `/party-building/members/${item.id}`,
      })),
      ...leadership.map((item) => ({
        module: '概况信息',
        title: `${item.name} ${item.position || ''}`.trim(),
        description: item.duty || '',
        date: item.createdAt,
        link: '/overview-info/leadership',
      })),
      ...publicInfos.map((item) => ({
        module: '信息公开',
        title: item.title,
        description: this.excerpt(item.content),
        date: item.publishDate || item.createdAt,
        link: `/info-public/personnel/${item.id}`,
      })),
    ]

    list.sort((a, b) => this.timeValue(b.date) - this.timeValue(a.date))
    return { list: list.slice(0, take), total: list.length, keyword: text }
  }

  private partyLink(item: PartyWork) {
    if (item.type === '团建工作') return `/party-building/team-work/${item.id}`
    if (item.type === '党员学习') return `/party-building/study/${item.id}`
    return `/party-building/party-work/${item.id}`
  }

  private excerpt(content?: string | null) {
    return (content || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 120)
  }

  private timeValue(value: Date | string | null) {
    if (!value) return 0
    const time = new Date(value).getTime()
    return Number.isFinite(time) ? time : 0
  }
}
