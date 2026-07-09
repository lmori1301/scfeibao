import { execFileSync } from 'node:child_process'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:5173'
const ADMIN_URL = process.env.ADMIN_URL || 'http://127.0.0.1:5176'
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:3003'
const DB_HOST = process.env.SMOKE_DB_HOST || '127.0.0.1'
const DB_PORT = process.env.SMOKE_DB_PORT || '3308'
const DB_USER = process.env.SMOKE_DB_USER || 'root'
const DB_PASSWORD = process.env.SMOKE_DB_PASSWORD || ''
const DB_NAME = process.env.SMOKE_DB_NAME || 'feibao_rescue'
const LOGIN_USERNAME = process.env.SMOKE_ADMIN_USER || 'admin'
const LOGIN_PASSWORD = process.env.SMOKE_ADMIN_PASSWORD || 'admin123'

const results = []

function record(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` - ${detail}` : ''}`)
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function sqlEscape(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function mysqlQuery(sql) {
  const args = [
    `-h${DB_HOST}`,
    `-P${DB_PORT}`,
    `-u${DB_USER}`,
    '-D',
    DB_NAME,
    '-N',
    '-B',
    '-e',
    sql,
  ]

  if (DB_PASSWORD) {
    args.splice(3, 0, `-p${DB_PASSWORD}`)
  }

  return execFileSync('mysql', args, { encoding: 'utf8' }).trim()
}

function cleanupSmokeNews() {
  mysqlQuery("delete from news where title like 'SmokeTest-%'")
}

function cleanupSmokePersonnel() {
  mysqlQuery("delete from personnel where name like 'SmokeTest-%' or idCard like 'SMOKEID-%'")
}

function cleanupSmokeVehicles() {
  mysqlQuery("delete from vehicles where plateNumber like 'SMOKE-%'")
}

function cleanupSmokeLocations() {
  mysqlQuery("delete from locations where name like 'SmokeTest-%'")
}

function cleanupSmokeCertificates() {
  mysqlQuery("delete from certificates where certificateNumber like 'SMOKE-CERT-%'")
}

function cleanupSmokeAdminUsers() {
  mysqlQuery("delete from admin_users where username like 'smoke_admin_%' or username like 'smoke_link_admin_%' or username like 'smoke_bad_role_%'")
}

function cleanupSmokeRoles() {
  mysqlQuery("delete from roles where code like 'smoke_role_%' or name like 'SmokeRole-%' or code like 'smoke_link_%' or name like 'SmokeLinkRole-%'")
}

function cleanupSmokeBanners() {
  mysqlQuery("delete from banners where title like 'SmokeBanner-%'")
}

function cleanupSmokeVideos() {
  mysqlQuery("delete from videos where title like 'SmokeVideo-%'")
}

function cleanupSmokeTeamIntro() {
  mysqlQuery("delete from team_intro where title like 'SmokeTeamIntro-%'")
}

function cleanupSmokeFriendLinks() {
  mysqlQuery("delete from friend_links where name like 'SmokeLink-%'")
}

function cleanupSmokePolicies() {
  mysqlQuery("delete from policies where title like 'SmokePolicy-%'")
}

function cleanupSmokePartyWorks() {
  mysqlQuery("delete from party_works where title like 'SmokeParty-%'")
}

function cleanupSmokeLeadership() {
  mysqlQuery("delete from leadership where name like 'SmokeLeader-%'")
}

function cleanupSmokeTeamShowcase() {
  mysqlQuery("delete from team_showcase where title like 'SmokeShowcase-%'")
}

function cleanupSmokeAppointments() {
  mysqlQuery("delete from appointments where title like 'SmokeAppointment-%'")
}

function cleanupSmokePartyMembers() {
  mysqlQuery("delete from party_members where name like 'SmokePartyMember-%'")
}

function cleanupSmokePartyWorksStandalone() {
  mysqlQuery("delete from party_works where title like 'SmokePartyWork-%'")
}

function cleanupSmokeRescueCases() {
  mysqlQuery("delete from rescue_cases where title like 'SmokeRescueCase-%'")
}

async function requestJson(url, options = {}, expectedStatuses = [200]) {
  const headers = { ...(options.headers || {}) }
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, { ...options, headers })
  const text = await response.text()
  let json = null

  if (text) {
    try {
      json = JSON.parse(text)
    } catch {
      json = null
    }
  }

  assert(
    expectedStatuses.includes(response.status),
    `${url} returned ${response.status}${text ? `: ${text}` : ''}`
  )
  return { response, json, text }
}

async function runCheck(name, fn) {
  try {
    const detail = await fn()
    record(name, true, detail)
  } catch (error) {
    record(name, false, error.message)
    process.exitCode = 1
  }
}

async function main() {
  let authToken = ''
  let createdNewsId = ''
  const tempTitle = `SmokeTest-${Date.now()}`
  const tempTitleUpdated = `${tempTitle}-Updated`

  cleanupSmokeNews()
  cleanupSmokePersonnel()
  cleanupSmokeVehicles()
  cleanupSmokeLocations()
  cleanupSmokeCertificates()
  cleanupSmokeAdminUsers()
  cleanupSmokeRoles()
  cleanupSmokeBanners()
  cleanupSmokeVideos()
  cleanupSmokeTeamIntro()
  cleanupSmokeFriendLinks()
  cleanupSmokePolicies()
  cleanupSmokePartyWorks()
  cleanupSmokeLeadership()
  cleanupSmokeTeamShowcase()
  cleanupSmokeAppointments()
  cleanupSmokePartyMembers()
  cleanupSmokePartyWorksStandalone()
  cleanupSmokeRescueCases()

  await runCheck('前台首页可访问', async () => {
    const response = await fetch(FRONTEND_URL)
    const text = await response.text()
    assert(response.status === 200, `status=${response.status}`)
    assert(text.includes('<div id="app"></div>'), 'missing app root')
    return FRONTEND_URL
  })

  await runCheck('管理端登录页可访问', async () => {
    const response = await fetch(`${ADMIN_URL}/login`)
    const text = await response.text()
    assert(response.status === 200, `status=${response.status}`)
    assert(text.includes('后台管理系统'), 'missing login page marker')
    return `${ADMIN_URL}/login`
  })

  await runCheck('官网代理 Banner 接口', async () => {
    const { json } = await requestJson(`${FRONTEND_URL}/api/home/banner`)
    assert(json?.code === 200, 'code is not 200')
    assert(Array.isArray(json?.data) && json.data.length > 0, 'banner list is empty')
    return `${json.data.length} 条`
  })

  await runCheck('官网代理动态接口', async () => {
    const { json } = await requestJson(`${FRONTEND_URL}/api/home/dynamics`)
    assert(json?.code === 200, 'code is not 200')
    assert(Array.isArray(json?.data), 'dynamics payload is invalid')
    return `${json.data.length} 条`
  })

  await runCheck('管理端登录鉴权链路', async () => {
    const { json } = await requestJson(
      `${ADMIN_URL}/api/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify({ username: LOGIN_USERNAME, password: LOGIN_PASSWORD }),
      },
      [200, 201]
    )

    assert(json?.code === 200, 'login code is not 200')
    assert(json?.data?.token, 'missing auth token')
    authToken = json.data.token
    return LOGIN_USERNAME
  })

  await runCheck('后端鉴权接口 profile', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'profile code is not 200')
    assert(json?.data?.username === LOGIN_USERNAME, 'profile username mismatch')
    return json.data.realName || json.data.username
  })

  await runCheck('管理端仪表盘接口', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'dashboard code is not 200')
    assert(json?.data?.news?.total >= 0, 'missing dashboard stats')
    return `新闻 ${json.data.news.total} 条`
  })

  await runCheck('后台新闻未登录保护', async () => {
    const { json } = await requestJson(`${BACKEND_URL}/api/news?page=1&pageSize=1`, {}, [401])
    assert(json?.code === 401, 'news list should require auth')
    return '401 已生效'
  })

  await runCheck('后台新闻登录后可读取', async () => {
    const { json } = await requestJson(`${BACKEND_URL}/api/news?page=1&pageSize=1`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'news list code is not 200')
    assert(Array.isArray(json?.data?.items), 'news items missing')
    return `${json.data.total} 条`
  })

  await runCheck('后台人员页面列表接口', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/personnel?page=1&pageSize=3`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'personnel list code is not 200')
    assert(Array.isArray(json?.data?.items), 'personnel items missing')
    return `${json.data.total} 条`
  })

  await runCheck('后台车辆页面列表接口', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/vehicles?page=1&pageSize=3`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'vehicles list code is not 200')
    assert(Array.isArray(json?.data?.items), 'vehicles items missing')
    return `${json.data.total} 条`
  })

  await runCheck('后台地址页面列表接口', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/locations?page=1&pageSize=3`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'locations list code is not 200')
    assert(Array.isArray(json?.data?.items), 'locations items missing')
    return `${json.data.total} 条`
  })

  await runCheck('后台证书页面列表接口', async () => {
    const { json } = await requestJson(`${ADMIN_URL}/api/certificates?page=1&pageSize=3`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(json?.code === 200, 'certificates list code is not 200')
    assert(Array.isArray(json?.data?.items), 'certificates items missing')
    return `${json.data.total} 条`
  })

  await runCheck('查询系统证书链路', async () => {
    const line = mysqlQuery("select certificateNumber from certificates where status = 1 order by id limit 1")
    assert(line, 'no certificate sample found')
    const certificateNumber = line.split('\t')[0]
    const { json } = await requestJson(`${FRONTEND_URL}/api/certificates/search?certificateNumber=${encodeURIComponent(certificateNumber)}`)
    assert(json?.code === 200, 'certificate search code is not 200')
    return certificateNumber
  })

  await runCheck('查询系统人员链路', async () => {
    const line = mysqlQuery("select idCard from personnel where status = 1 order by id limit 1")
    assert(line, 'no personnel sample found')
    const idCard = line.split('\t')[0]
    const { json } = await requestJson(`${FRONTEND_URL}/api/personnel/search?idCard=${encodeURIComponent(idCard)}`)
    assert(json?.code === 200, 'personnel search code is not 200')
    return idCard
  })

  await runCheck('查询系统车辆链路', async () => {
    const line = mysqlQuery("select plateNumber from vehicles where status = 1 order by id limit 1")
    assert(line, 'no vehicle sample found')
    const plateNumber = line.split('\t')[0]
    const { json } = await requestJson(`${FRONTEND_URL}/api/vehicles/search?plateNumber=${encodeURIComponent(plateNumber)}`)
    assert(json?.code === 200, 'vehicle search code is not 200')
    return plateNumber
  })

  await runCheck('后台新闻 CRUD 与数据库打通', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from news'))
    let currentNewsId = ''

    const createPayload = {
      title: tempTitle,
      summary: '联通测试摘要',
      content: '<p>联通测试内容</p>',
      coverImage: '',
      category: '动态要闻',
      author: 'smoke-test',
      status: 0,
      publishedAt: '2026-04-16T00:00:00Z',
      sort: 0,
      isHeadline: 0,
      isNew: 0
    }

    const createResponse = await requestJson(`${BACKEND_URL}/api/news`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(createPayload),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create news failed')

    createdNewsId = mysqlQuery(`select id from news where title = '${sqlEscape(tempTitle)}' order by id desc limit 1`)
    currentNewsId = createdNewsId
    assert(createdNewsId, 'cannot find created news in database')

    const updateResponse = await requestJson(`${BACKEND_URL}/api/news/${createdNewsId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ title: tempTitleUpdated, isNew: 1 }),
    })
    assert(updateResponse.json?.code === 200, 'update news failed')

    const updatedTitle = mysqlQuery(`select title from news where id = ${createdNewsId}`)
    assert(updatedTitle === tempTitleUpdated, 'updated title mismatch')

    const deleteResponse = await requestJson(`${BACKEND_URL}/api/news/${createdNewsId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete news failed')

    const afterCount = Number(mysqlQuery('select count(*) from news'))
    assert(beforeCount === afterCount, 'news count did not recover after cleanup')
    createdNewsId = ''

    return `id=${currentNewsId}`
  })

  await runCheck('后台人员表单新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from personnel where deleted_at is null'))
    const unique = Date.now()
    const baseName = `SmokeTest-${unique}`
    const baseIdCard = `51${String(unique).slice(-16)}`

    const createPayload = {
      name: baseName,
      idCard: baseIdCard,
      phone: '13800000001',
      team: '联调测试支队',
      position: '测试队员',
      joinDate: '2026-04-18T00:00:00.000Z',
      photoUrl: '',
      status: 1,
    }

    const createResponse = await requestJson(`${ADMIN_URL}/api/personnel`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(createPayload),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create personnel failed')

    const createdId = mysqlQuery(`select id from personnel where idCard = '${sqlEscape(baseIdCard)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created personnel in database')

    const detailResponse = await requestJson(`${ADMIN_URL}/api/personnel/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(detailResponse.json?.code === 200, 'personnel detail code is not 200')
    assert(detailResponse.json?.data?.name === baseName, 'personnel detail mismatch')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/personnel/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ position: '测试班长', status: 0 }),
    })
    assert(updateResponse.json?.code === 200, 'update personnel failed')

    const updatedLine = mysqlQuery(`select position, status from personnel where id = ${createdId}`)
    assert(updatedLine === '测试班长\t0', 'updated personnel mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/personnel/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete personnel failed')

    const afterCount = Number(mysqlQuery('select count(*) from personnel where deleted_at is null'))
    assert(beforeCount === afterCount, 'personnel count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台车辆表单新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from vehicles where deleted_at is null'))
    const unique = Date.now()
    const plateNumber = `SMOKE-${String(unique).slice(-6)}`

    const createPayload = {
      plateNumber,
      vehicleType: '应急救援指挥车',
      brandModel: 'Smoke SUV',
      color: '银灰',
      purchaseDate: '2026-04-18T00:00:00.000Z',
      team: '联调测试支队',
      photoUrl: '',
      status: 1,
    }

    const createResponse = await requestJson(`${ADMIN_URL}/api/vehicles`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(createPayload),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create vehicle failed')

    const createdId = mysqlQuery(`select id from vehicles where plateNumber = '${sqlEscape(plateNumber)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created vehicle in database')

    const detailResponse = await requestJson(`${ADMIN_URL}/api/vehicles/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(detailResponse.json?.code === 200, 'vehicle detail code is not 200')
    assert(detailResponse.json?.data?.plateNumber === plateNumber, 'vehicle detail mismatch')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/vehicles/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ color: '曜石黑', status: 0 }),
    })
    assert(updateResponse.json?.code === 200, 'update vehicle failed')

    const updatedLine = mysqlQuery(`select color, status from vehicles where id = ${createdId}`)
    assert(updatedLine === '曜石黑\t0', 'updated vehicle mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/vehicles/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete vehicle failed')

    const afterCount = Number(mysqlQuery('select count(*) from vehicles where deleted_at is null'))
    assert(beforeCount === afterCount, 'vehicle count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台地址表单新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from locations where deleted_at is null'))
    const unique = Date.now()
    const locationName = `SmokeTest-${unique}`

    const createPayload = {
      name: locationName,
      address: '成都市高新区联调测试路 18 号',
      phone: '028-12345678',
      sort: 99,
      status: 1,
    }

    const createResponse = await requestJson(`${ADMIN_URL}/api/locations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(createPayload),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create location failed')

    const createdId = mysqlQuery(`select id from locations where name = '${sqlEscape(locationName)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created location in database')

    const detailResponse = await requestJson(`${ADMIN_URL}/api/locations/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(detailResponse.json?.code === 200, 'location detail code is not 200')
    assert(detailResponse.json?.data?.name === locationName, 'location detail mismatch')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/locations/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ phone: '028-87654321', status: 0 }),
    })
    assert(updateResponse.json?.code === 200, 'update location failed')

    const updatedLine = mysqlQuery(`select phone, status from locations where id = ${createdId}`)
    assert(updatedLine === '028-87654321\t0', 'updated location mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/locations/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete location failed')

    const afterCount = Number(mysqlQuery('select count(*) from locations where deleted_at is null'))
    assert(beforeCount === afterCount, 'location count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台证书表单新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from certificates where deleted_at is null'))
    const unique = Date.now()
    const certificateNumber = `SMOKE-CERT-${String(unique).slice(-8)}`

    const createPayload = {
      certificateNumber,
      certificateName: '联调测试证书',
      certificateType: '联调测试证书',
      holderName: '联调测试员',
      holderIdCard: '510100199001011234',
      issuingAuthority: '四川飞豹联调中心',
      issueDate: '2026-04-18T00:00:00.000Z',
      expiryDate: '2027-04-18T00:00:00.000Z',
      status: 1,
    }

    const createResponse = await requestJson(`${ADMIN_URL}/api/certificates`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(createPayload),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create certificate failed')

    const createdId = mysqlQuery(`select id from certificates where certificateNumber = '${sqlEscape(certificateNumber)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created certificate in database')

    const detailResponse = await requestJson(`${ADMIN_URL}/api/certificates/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(detailResponse.json?.code === 200, 'certificate detail code is not 200')
    assert(detailResponse.json?.data?.certificateNumber === certificateNumber, 'certificate detail mismatch')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/certificates/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ issuingAuthority: '四川飞豹测试更新中心', status: 0 }),
    })
    assert(updateResponse.json?.code === 200, 'update certificate failed')

    const updatedLine = mysqlQuery(`select issuingAuthority, status from certificates where id = ${createdId}`)
    assert(updatedLine === '四川飞豹测试更新中心\t0', 'updated certificate mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/certificates/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete certificate failed')

    const afterCount = Number(mysqlQuery('select count(*) from certificates where deleted_at is null'))
    assert(beforeCount === afterCount, 'certificate count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台网站配置保存回读', async () => {
    const unique = `SmokeCfg-${Date.now()}`
    const values = {
      host_unit: `${unique}-主办`,
      organizer_unit: `${unique}-承办`,
      icp_number: `${unique}-ICP`,
      copyright: `${unique}-版权`,
    }

    for (const [key, value] of Object.entries(values)) {
      const response = await requestJson(`${ADMIN_URL}/api/config`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ key, value, description: key }),
      }, [200, 201])
      assert(response.json?.code === 200, `config save failed for ${key}`)
    }

    const readResponse = await requestJson(`${ADMIN_URL}/api/config`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(readResponse.json?.code === 200, 'config read code is not 200')
    for (const [key, value] of Object.entries(values)) {
      assert(readResponse.json?.data?.[key] === value, `config mismatch for ${key}`)
    }
    return values.host_unit
  })

  await runCheck('后台角色页新增搜索状态编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from roles'))
    const unique = Date.now()
    const name = `SmokeRole-${unique}`
    const code = `smoke_role_${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/admin/roles`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name,
        code,
        description: '联调测试角色',
        permissions: ['系统设置', '档案台账'],
      }),
    }, [200, 201])
    assert(createResponse.response.status === 201 || createResponse.response.status === 200, 'create role failed')

    const createdId = mysqlQuery(`select id from roles where code = '${sqlEscape(code)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created role in database')

    const searchResponse = await requestJson(`${ADMIN_URL}/api/admin/roles?page=1&pageSize=20&name=${encodeURIComponent('SmokeRole-')}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(Array.isArray(searchResponse.json?.data?.list), 'role search list missing')
    assert(searchResponse.json.data.list.some((item) => item.code === code), 'role search did not hit created role')

    const statusResponse = await requestJson(`${ADMIN_URL}/api/admin/roles/${createdId}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ status: 'disabled' }),
    })
    assert(statusResponse.json?.code === 200, 'role status update failed')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/admin/roles/${createdId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ name: `${name}-Updated`, description: '联调测试角色-更新', permissions: ['系统设置'] }),
    })
    assert(updateResponse.json?.code === 200, 'role update failed')

    const updatedLine = mysqlQuery(`select status, name from roles where id = ${createdId}`)
    assert(updatedLine === `disabled\t${name}-Updated`, 'updated role mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/admin/roles/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'role delete failed')

    const afterCount = Number(mysqlQuery('select count(*) from roles'))
    assert(beforeCount === afterCount, 'role count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('权限角色与用户管理分配全链', async () => {
    const beforeRoles = Number(mysqlQuery('select count(*) from roles'))
    const beforeAdmins = Number(mysqlQuery('select count(*) from admin_users'))
    const unique = Date.now()
    const roleName = `SmokeLinkRole-${unique}`
    const roleCode = `smoke_link_${unique}`
    const username = `smoke_link_admin_${unique}`

    const createRoleResponse = await requestJson(`${ADMIN_URL}/api/admin/roles`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name: roleName,
        code: roleCode,
        description: '用户管理-权限联动',
        permissions: ['系统设置'],
      }),
    }, [200, 201])
    assert(createRoleResponse.response.status === 201 || createRoleResponse.response.status === 200, 'link: create role failed')

    const roleId = mysqlQuery(`select id from roles where code = '${sqlEscape(roleCode)}' order by id desc limit 1`)
    assert(roleId, 'link: cannot find created role')

    const createAdminResponse = await requestJson(`${ADMIN_URL}/api/admin/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        username,
        password: 'SmokeAdmin123',
        name: '联动管理员',
        email: `smoke_link_${unique}@example.com`,
        phone: '13800000003',
        role: roleName,
      }),
    }, [200, 201])
    assert(createAdminResponse.json?.code === 200, 'link: create admin with custom role failed')

    const adminId = mysqlQuery(`select id from admin_users where username = '${sqlEscape(username)}' order by id desc limit 1`)
    assert(adminId, 'link: cannot find created admin')

    const roleCol = mysqlQuery(`select \`role\` from admin_users where id = ${adminId}`)
    assert(roleCol === roleName, `link: admin_users.role expected ${roleName}, got ${roleCol}`)

    const badRoleResponse = await requestJson(`${ADMIN_URL}/api/admin/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        username: `smoke_bad_role_${unique}`,
        password: 'SmokeAdmin123',
        name: '无效角色',
        role: 'AbsolutelyNonexistentRole_999999',
      }),
    }, [400])
    assert(badRoleResponse.json?.code === 400, 'link: invalid role should return 400')

    const deleteAdminResponse = await requestJson(`${ADMIN_URL}/api/admin/users/${adminId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteAdminResponse.json?.code === 200, 'link: delete admin failed')

    const deleteRoleResponse = await requestJson(`${ADMIN_URL}/api/admin/roles/${roleId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteRoleResponse.json?.code === 200, 'link: delete role failed')

    assert(Number(mysqlQuery('select count(*) from roles')) === beforeRoles, 'link: role count mismatch after cleanup')
    assert(Number(mysqlQuery('select count(*) from admin_users')) === beforeAdmins, 'link: admin count mismatch after cleanup')
    return roleName
  })

  await runCheck('后台管理员页新增搜索状态编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from admin_users'))
    const unique = Date.now()
    const username = `smoke_admin_${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/admin/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        username,
        password: 'SmokeAdmin123',
        name: '联调管理员',
        email: `smoke_${unique}@example.com`,
        phone: '13800000002',
        role: 'editor',
      }),
    }, [200, 201])
    assert(createResponse.response.status === 201 || createResponse.response.status === 200, 'create admin user failed')

    const createdId = mysqlQuery(`select id from admin_users where username = '${sqlEscape(username)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created admin user in database')

    const searchResponse = await requestJson(`${ADMIN_URL}/api/admin/users?page=1&pageSize=20&username=${encodeURIComponent('smoke_admin_')}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(Array.isArray(searchResponse.json?.data?.list), 'admin user search list missing')
    assert(searchResponse.json.data.list.some((item) => item.username === username), 'admin user search did not hit created user')

    const statusResponse = await requestJson(`${ADMIN_URL}/api/admin/users/${createdId}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ status: 'disabled' }),
    })
    assert(statusResponse.json?.code === 200, 'admin user status update failed')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/admin/users/${createdId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ name: '联调管理员-更新', role: 'editor', email: `updated_${unique}@example.com` }),
    })
    assert(updateResponse.json?.code === 200, 'admin user update failed')

    const updatedLine = mysqlQuery(`select status, name from admin_users where id = ${createdId}`)
    assert(updatedLine === 'disabled\t联调管理员-更新', 'updated admin user mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/admin/users/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'admin user delete failed')

    const afterCount = Number(mysqlQuery('select count(*) from admin_users'))
    assert(beforeCount === afterCount, 'admin user count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台轮播图页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from banners'))
    const unique = Date.now()
    const title = `SmokeBanner-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/banner/save`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        imageUrl: '/uploads/images/smoke-banner.png',
        sort: 77,
        status: '显示',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create banner failed')

    const createdId = mysqlQuery(`select id from banners where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created banner in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/banner/save`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        id: Number(createdId),
        title: `${title}-Updated`,
        imageUrl: '/uploads/images/smoke-banner-updated.png',
        sort: 78,
        status: '隐藏',
      }),
    }, [200, 201])
    assert(updateResponse.json?.code === 200, 'update banner failed')

    const updatedLine = mysqlQuery(`select title, isActive from banners where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t0`, 'updated banner mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/banner/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete banner failed')

    const afterCount = Number(mysqlQuery('select count(*) from banners'))
    assert(beforeCount === afterCount, 'banner count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台视频页新增置顶编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from videos'))
    const unique = Date.now()
    const title = `SmokeVideo-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/videos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        videoUrl: 'https://example.com/smoke-video.mp4',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create video failed')

    const createdId = mysqlQuery(`select id from videos where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created video in database')

    const topResponse = await requestJson(`${ADMIN_URL}/api/videos/${createdId}/toggle-top`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(topResponse.json?.code === 200, 'toggle top failed')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/videos/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        videoUrl: 'https://example.com/smoke-video-updated.mp4',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update video failed')

    const updatedLine = mysqlQuery(`select title, isTop from videos where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t1`, 'updated video mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/videos/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete video failed')

    const afterCount = Number(mysqlQuery('select count(*) from videos'))
    assert(beforeCount === afterCount, 'video count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台队伍介绍页富文本新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from team_intro'))
    const unique = Date.now()
    const title = `SmokeTeamIntro-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/team-intro`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        content: '<p>联调测试富文本内容</p><p><strong>四川飞豹</strong>队伍介绍测试。</p>',
        sort: 66,
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create team intro failed')

    const createdId = mysqlQuery(`select id from team_intro where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created team intro in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/team-intro/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        content: '<p>联调测试富文本内容-更新</p>',
        sort: 67,
      }),
    })
    assert(updateResponse.json?.code === 200, 'update team intro failed')

    const updatedLine = mysqlQuery(`select title, sort from team_intro where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t67`, 'updated team intro mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/team-intro/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete team intro failed')

    const afterCount = Number(mysqlQuery('select count(*) from team_intro'))
    assert(beforeCount === afterCount, 'team intro count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台友情链接页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from friend_links'))
    const unique = Date.now()
    const name = `SmokeLink-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/friend-links`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name,
        url: 'https://example.com/smoke-link',
        logo: '/uploads/images/smoke-link.png',
        sort: 33,
        isActive: true,
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create friend link failed')

    const createdId = mysqlQuery(`select id from friend_links where name = '${sqlEscape(name)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created friend link in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/friend-links/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name: `${name}-Updated`,
        url: 'https://example.com/smoke-link-updated',
        logo: '/uploads/images/smoke-link-updated.png',
        sort: 34,
        isActive: false,
      }),
    })
    assert(updateResponse.json?.code === 200, 'update friend link failed')

    const updatedLine = mysqlQuery(`select name, isActive from friend_links where id = ${createdId}`)
    assert(updatedLine === `${name}-Updated\t0`, 'updated friend link mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/friend-links/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete friend link failed')

    const afterCount = Number(mysqlQuery('select count(*) from friend_links'))
    assert(beforeCount === afterCount, 'friend link count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台政策文件页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from policies where deleted_at is null'))
    const unique = Date.now()
    const title = `SmokePolicy-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/policies`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        summary: '联调测试政策摘要',
        docNumber: `文号-${unique}`,
        category: '法律法规',
        publishDate: '2026-04-18T00:00:00.000Z',
        effectiveDate: '2026-04-18T00:00:00.000Z',
        expiryDate: '2027-04-18T00:00:00.000Z',
        department: '联调测试部门',
        attachment: '/uploads/files/smoke-policy.pdf',
        attachmentName: 'smoke-policy.pdf',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create policy failed')

    const createdId = mysqlQuery(`select id from policies where title = '${sqlEscape(title)}' and deleted_at is null order by id desc limit 1`)
    assert(createdId, 'cannot find created policy in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/policies/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        department: '联调更新部门',
        attachmentName: 'smoke-policy-updated.pdf',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update policy failed')

    const updatedLine = mysqlQuery(`select title, issuingAuthority from policies where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t联调更新部门`, 'updated policy mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/policies/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete policy failed')

    const afterCount = Number(mysqlQuery('select count(*) from policies where deleted_at is null'))
    assert(beforeCount === afterCount, 'policy count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台党建专栏页富文本新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from party_works'))
    const unique = Date.now()
    const title = `SmokeParty-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/party-building`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        type: '党建工作',
        content: '<p>联调测试党建内容</p>',
        publishDate: '2026-04-18T00:00:00.000Z',
        status: '草稿',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create party work failed')

    const createdId = mysqlQuery(`select id from party_works where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created party work in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/party-building/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        status: '已发布',
        content: '<p>联调测试党建内容-更新</p>',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update party work failed')

    const updatedLine = mysqlQuery(`select title, status from party_works where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t已发布`, 'updated party work mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/party-building/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete party work failed')

    const afterCount = Number(mysqlQuery('select count(*) from party_works'))
    assert(beforeCount === afterCount, 'party work count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台领导信息页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from leadership'))
    const unique = Date.now()
    const name = `SmokeLeader-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/leadership`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name,
        position: '测试队长',
        gender: '男',
        nation: '汉族',
        birth: '1990-01',
        education: '本科',
        political: '党员',
        duty: '联调测试职责',
        experience: 6,
        actions: 18,
        photo: '/uploads/images/smoke-leader.png',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create leadership failed')

    const createdId = mysqlQuery(`select id from leadership where name = '${sqlEscape(name)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created leadership in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/leadership/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name: `${name}-Updated`,
        actions: 19,
        duty: '联调测试职责-更新',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update leadership failed')

    const updatedLine = mysqlQuery(`select name, actions from leadership where id = ${createdId}`)
    assert(updatedLine === `${name}-Updated\t19`, 'updated leadership mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/leadership/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete leadership failed')

    const afterCount = Number(mysqlQuery('select count(*) from leadership'))
    assert(beforeCount === afterCount, 'leadership count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台队伍风采页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from team_showcase'))
    const unique = Date.now()
    const title = `SmokeShowcase-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/team-showcase`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        type: '训练活动',
        imageUrl: '/uploads/images/smoke-showcase.png',
        description: '<p>联调测试队伍风采</p>',
        sort: 21,
        status: '显示',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create team showcase failed')

    const createdId = mysqlQuery(`select id from team_showcase where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created team showcase in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/team-showcase/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        status: '隐藏',
        sort: 22,
      }),
    })
    assert(updateResponse.json?.code === 200, 'update team showcase failed')

    const updatedLine = mysqlQuery(`select title, status from team_showcase where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t隐藏`, 'updated team showcase mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/team-showcase/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete team showcase failed')

    const afterCount = Number(mysqlQuery('select count(*) from team_showcase'))
    assert(beforeCount === afterCount, 'team showcase count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台人事任免页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from appointments'))
    const unique = Date.now()
    const title = `SmokeAppointment-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/appointments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        docNumber: `任免-${unique}`,
        publishDate: '2026-04-18',
        effectiveDate: '2026-04-19',
        department: '联调测试部门',
        attachment: '/uploads/files/smoke-appointment.pdf',
        attachmentName: 'smoke-appointment.pdf',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create appointment failed')

    const createdId = mysqlQuery(`select id from appointments where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created appointment in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/appointments/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        department: '联调更新部门',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update appointment failed')

    const updatedLine = mysqlQuery(`select title, department from appointments where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t联调更新部门`, 'updated appointment mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/appointments/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete appointment failed')

    const afterCount = Number(mysqlQuery('select count(*) from appointments'))
    assert(beforeCount === afterCount, 'appointment count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台党员信息页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from party_members'))
    const unique = Date.now()
    const name = `SmokePartyMember-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/party-members`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name,
        position: '测试党员',
        avatar: '/uploads/images/smoke-party-member.png',
        description: '联调测试党员简介',
        sort: 5,
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create party member failed')

    const createdId = mysqlQuery(`select id from party_members where name = '${sqlEscape(name)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created party member in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/party-members/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        name: `${name}-Updated`,
        sort: 6,
      }),
    })
    assert(updateResponse.json?.code === 200, 'update party member failed')

    const updatedLine = mysqlQuery(`select name, sort from party_members where id = ${createdId}`)
    assert(updatedLine === `${name}-Updated\t6`, 'updated party member mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/party-members/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete party member failed')

    const afterCount = Number(mysqlQuery('select count(*) from party_members'))
    assert(beforeCount === afterCount, 'party member count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台党建工作页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from party_works'))
    const unique = Date.now()
    const title = `SmokePartyWork-${unique}`

    const createResponse = await requestJson(`${ADMIN_URL}/api/party-works`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title,
        content: '联调测试党建工作内容',
        coverImage: '/uploads/images/smoke-party-work.png',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create party works failed')

    const createdId = mysqlQuery(`select id from party_works where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created party works in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/party-works/${createdId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        title: `${title}-Updated`,
        content: '联调测试党建工作内容-更新',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update party works failed')

    const updatedLine = mysqlQuery(`select title from party_works where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated`, 'updated party works mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/party-works/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    assert(deleteResponse.json?.code === 200, 'delete party works failed')

    const afterCount = Number(mysqlQuery('select count(*) from party_works'))
    assert(beforeCount === afterCount, 'party works count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('后台救援案例页新增编辑删除', async () => {
    const beforeCount = Number(mysqlQuery('select count(*) from rescue_cases'))
    const unique = Date.now()
    const title = `SmokeRescueCase-${unique}`

    const listResponse = await requestJson(`${ADMIN_URL}/api/rescue-cases?page=1&pageSize=5`)
    assert(listResponse.json?.code === 200, 'rescue case list code is not 200')
    assert(Array.isArray(listResponse.json?.data?.items), 'rescue case list payload is invalid')

    const createResponse = await requestJson(`${ADMIN_URL}/api/rescue-cases`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        location: '成都市联调区域',
        rescueDate: '2026-04-18',
        coverImage: '/uploads/images/smoke-rescue-case.png',
        content: '联调测试救援案例内容',
      }),
    }, [200, 201])
    assert(createResponse.json?.code === 200, 'create rescue case failed')

    const createdId = mysqlQuery(`select id from rescue_cases where title = '${sqlEscape(title)}' order by id desc limit 1`)
    assert(createdId, 'cannot find created rescue case in database')

    const updateResponse = await requestJson(`${ADMIN_URL}/api/rescue-cases/${createdId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: `${title}-Updated`,
        location: '成都市联调区域-更新',
      }),
    })
    assert(updateResponse.json?.code === 200, 'update rescue case failed')

    const updatedLine = mysqlQuery(`select title, location from rescue_cases where id = ${createdId}`)
    assert(updatedLine === `${title}-Updated\t成都市联调区域-更新`, 'updated rescue case mismatch')

    const deleteResponse = await requestJson(`${ADMIN_URL}/api/rescue-cases/${createdId}`, {
      method: 'DELETE',
    })
    assert(deleteResponse.json?.code === 200, 'delete rescue case failed')
    assert(deleteResponse.json?.data?.success === true, 'delete rescue case success flag missing')

    const afterCount = Number(mysqlQuery('select count(*) from rescue_cases'))
    assert(beforeCount === afterCount, 'rescue case count did not recover after cleanup')
    return `id=${createdId}`
  })

  await runCheck('数据库核心表状态', async () => {
    const statsLine = mysqlQuery([
      "select concat(",
      "'users=', (select count(*) from users), ',',",
      "'news=', (select count(*) from news), ',',",
      "'certificates=', (select count(*) from certificates), ',',",
      "'personnel=', (select count(*) from personnel), ',',",
      "'vehicles=', (select count(*) from vehicles)",
      ")"
    ].join(' '))

    assert(statsLine.includes('users='), 'database stats missing')
    return statsLine
  })

  console.log('\nSmoke test summary')
  for (const item of results) {
    console.log(`- [${item.ok ? 'x' : ' '}] ${item.name}${item.detail ? `: ${item.detail}` : ''}`)
  }

  cleanupSmokeNews()
  cleanupSmokePersonnel()
  cleanupSmokeVehicles()
  cleanupSmokeLocations()
  cleanupSmokeCertificates()
  cleanupSmokeAdminUsers()
  cleanupSmokeRoles()
  cleanupSmokeBanners()
  cleanupSmokeVideos()
  cleanupSmokeTeamIntro()
  cleanupSmokeFriendLinks()
  cleanupSmokePolicies()
  cleanupSmokePartyWorks()
  cleanupSmokeLeadership()
  cleanupSmokeTeamShowcase()
  cleanupSmokeAppointments()
  cleanupSmokePartyMembers()
  cleanupSmokePartyWorksStandalone()
  cleanupSmokeRescueCases()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
