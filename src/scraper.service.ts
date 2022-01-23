import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer/lib/cjs/puppeteer/node-puppeteer-core';
import * as cheerio from 'cheerio';
import { Urltype } from './urltype';

@Injectable()
export class Scraper {
  async scrapeUrl(url: string, type: Urltype) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const nav = page.waitForNavigation();
    await page.goto(url);
    await page.setViewport({ width: 800, height: 600 });
    await nav;
    const content = await page.content();
    const $ = cheerio.load(content);
    const el =
      type === Urltype.WIKIPEDIA
        ? $('div#mw-content-text p')
        : type === Urltype.MEDIUM
        ? $('article p')
        : $('body p');
    return el.text().substring(0, 1000);
  }
}
