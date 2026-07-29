#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, '..');
const cfgPath = join(SKILL_DIR, 'config.json');
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));

async function testAPI() {
  console.log('测试 API 端点...\n');

  // 测试 1: 获取模型列表
  try {
    const res = await fetch(`${cfg.baseURL}/models`, {
      headers: { 'Authorization': `Bearer ${cfg.apiKey}` }
    });
    console.log('1. Models API:', res.status);
    if (res.ok) {
      const data = await res.json();
      console.log('可用模型:', data.data?.map(m => m.id).join(', '));
    } else {
      console.log('响应:', await res.text().then(t => t.substring(0, 200)));
    }
  } catch (e) {
    console.log('Models API 错误:', e.message);
  }

  console.log('\n---\n');

  // 测试 2: 尝试生成图片（使用当前配置的模型）
  try {
    const res = await fetch(`${cfg.baseURL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cfg.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: cfg.model,
        prompt: '测试图片',
        size: '1024x1024',
        quality: 'standard',
        n: 1
      })
    });
    console.log('2. Images API:', res.status);
    const text = await res.text();
    console.log('响应:', text.substring(0, 300));
  } catch (e) {
    console.log('Images API 错误:', e.message);
  }
}

testAPI();
