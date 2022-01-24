import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer/lib/cjs/puppeteer/node-puppeteer-core';
import * as cheerio from 'cheerio';

@Injectable()
export class Scraper {
  async scrapeUrl(url: string, type: 'wikipedia' | 'medium' | 'other') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const nav = page.waitForNavigation();
    await page.goto(url);
    await page.setViewport({ width: 800, height: 600 });
    await nav;
    const content = await page.content();
    const $ = cheerio.load(content);
    const el =
      type === 'wikipedia'
        ? $('div#mw-content-text p')
        : type === 'medium'
        ? $('article p')
        : $('body p');
    return el.text();
  }
}
