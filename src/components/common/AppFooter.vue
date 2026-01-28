<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- 关于我们 -->
      <div class="footer-section">
        <h3 class="footer-title">关于我们</h3>
        <ul class="footer-links">
          <li><router-link to="/overview-info">领导信息</router-link></li>
          <li><router-link to="/overview-info">组织机构</router-link></li>
          <li><router-link to="/team-building">队伍简介</router-link></li>
        </ul>
      </div>

      <!-- 快速链接 -->
      <div class="footer-section">
        <h3 class="footer-title">快速链接</h3>
        <ul class="footer-links">
          <li><router-link to="/dynamic-news">动态要闻</router-link></li>
          <li><router-link to="/party-building">党建专栏</router-link></li>
          <li><router-link to="/policy-regulations">政策法规</router-link></li>
          <li><router-link to="/query-system">查询系统</router-link></li>
        </ul>
      </div>

      <!-- 联系方式 -->
      <div class="footer-section">
        <h3 class="footer-title">联系我们</h3>
        <ul class="footer-contact">
          <li>
            <el-icon><Location /></el-icon>
            <span>地址：四川省成都市XX区XX路XX号</span>
          </li>
          <li>
            <el-icon><Phone /></el-icon>
            <span>电话：028-XXXXXXXX</span>
          </li>
          <li>
            <el-icon><Message /></el-icon>
            <span>邮箱：contact@feibao-rescue.cn</span>
          </li>
        </ul>
      </div>

      <!-- 二维码 -->
      <div class="footer-section">
        <h3 class="footer-title">关注我们</h3>
        <div class="footer-qrcode">
          <div class="qrcode-placeholder">二维码</div>
          <p>官方微信公众号</p>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p>&copy; {{ currentYear }} 四川飞豹救援. All rights reserved.</p>
        <p class="footer-links-text">
          <a href="javascript:;">隐私政策</a>
          <span class="separator">|</span>
          <a href="javascript:;">使用条款</a>
          <span class="separator">|</span>
          <a href="javascript:;">网站地图</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Location, Phone, Message } from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.app-footer {
  width: 100%;
  background-color: #1f2937;
  color: #d1d5db;
  margin-top: 60px;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 20px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section {
  .footer-title {
    font-size: 18px;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 20px;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 12px;

      a {
        color: #d1d5db;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #3b82f6;
        }
      }
    }
  }

  .footer-contact {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 1.6;

      .el-icon {
        margin-right: 10px;
        margin-top: 3px;
        flex-shrink: 0;
      }
    }
  }

  .footer-qrcode {
    text-align: center;

    .qrcode-placeholder {
      width: 120px;
      height: 120px;
      margin: 0 auto 10px;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      margin: 0;
    }
  }
}

.footer-bottom {
  background-color: #111827;
  border-top: 1px solid #374151;
}

.footer-bottom-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-size: 14px;

  p {
    margin: 5px 0;
  }

  .footer-links-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #3b82f6;
      }
    }

    .separator {
      color: #4b5563;
    }
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px 20px;
  }
}
</style>
