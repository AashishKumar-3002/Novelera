import * as cheerio from 'cheerio';
import { Novel, Chapter } from '@/types';

const BASE_URL = 'https://lightnovelpub.me';

// Fetch HTML content from a URL
async function fetchHtml(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw new Error('Failed to fetch content');
  }
}

// Fetch latest novels from homepage
export async function fetchLatestNovels(): Promise<Novel[]> {
  try {
    const html = await fetchHtml(`${BASE_URL}`);
    const $ = cheerio.load(html);
    const novels: Novel[] = [];

    // Adjust selectors based on the actual HTML structure
    $('.novel-item').each((_, element) => {
      const $element = $(element);
      novels.push({
        id: $element.attr('data-id') || '',
        title: $element.find('.novel-title').text().trim(),
        author: $element.find('.novel-author').text().trim(),
        coverImage: $element.find('img').attr('src') || '',
        synopsis: $element.find('.novel-synopsis').text().trim(),
        status: $element.find('.novel-status').text().trim(),
        rating: $element.find('.novel-rating').text().trim(),
      });
    });

    return novels;
  } catch (error) {
    console.error('Error fetching latest novels:', error);
    throw new Error('Failed to fetch latest novels');
  }
}

// Fetch popular novels
export async function fetchPopularNovels(): Promise<Novel[]> {
  try {
    const html = await fetchHtml(`${BASE_URL}/popular`);
    const $ = cheerio.load(html);
    const novels: Novel[] = [];

    // Adjust selectors based on the actual HTML structure
    $('.novel-item').each((_, element) => {
      const $element = $(element);
      novels.push({
        id: $element.attr('data-id') || '',
        title: $element.find('.novel-title').text().trim(),
        author: $element.find('.novel-author').text().trim(),
        coverImage: $element.find('img').attr('src') || '',
        synopsis: $element.find('.novel-synopsis').text().trim(),
        status: $element.find('.novel-status').text().trim(),
        rating: $element.find('.novel-rating').text().trim(),
      });
    });

    return novels;
  } catch (error) {
    console.error('Error fetching popular novels:', error);
    throw new Error('Failed to fetch popular novels');
  }
}

// Fetch novel details and chapters
export async function fetchNovelDetails(novelId: string): Promise<{ novelDetails: Novel, novelChapters: Chapter[] }> {
  try {
    const html = await fetchHtml(`${BASE_URL}/novel/${novelId}`);
    const $ = cheerio.load(html);

    // Extract novel details
    const novelDetails: Novel = {
      id: novelId,
      title: $('.novel-title').text().trim(),
      author: $('.novel-author').text().trim(),
      coverImage: $('.novel-cover img').attr('src') || '',
      synopsis: $('.novel-synopsis').text().trim(),
      status: $('.novel-status').text().trim(),
      rating: $('.novel-rating').text().trim(),
    };

    // Extract chapters
    const novelChapters: Chapter[] = [];
    $('.chapter-item').each((_, element) => {
      const $element = $(element);
      novelChapters.push({
        id: $element.attr('data-id') || '',
        title: $element.find('.chapter-title').text().trim(),
        releaseDate: $element.find('.chapter-release-date').text().trim(),
      });
    });

    return {
      novelDetails,
      novelChapters,
    };
  } catch (error) {
    console.error('Error fetching novel details:', error);
    throw new Error('Failed to fetch novel details');
  }
}

// Fetch chapter content
export async function fetchChapterContent(
  novelId: string,
  chapterId: string
): Promise<{
  chapterContent: Chapter,
  novelInfo: Novel,
  prevChapter: string | null,
  nextChapter: string | null
}> {
  try {
    const html = await fetchHtml(`${BASE_URL}/novel/${novelId}/chapter/${chapterId}`);
    const $ = cheerio.load(html);

    // Extract chapter content
    const content: string[] = [];
    $('.chapter-content p').each((_, element) => {
      content.push($(element).text().trim());
    });

    // Extract novel info
    const novelInfo: Novel = {
      id: novelId,
      title: $('.novel-title').text().trim(),
      author: $('.novel-author').text().trim(),
      coverImage: $('.novel-cover img').attr('src') || '',
      synopsis: '',  // Not typically available on chapter pages
      status: '',    // Not typically available on chapter pages
      rating: '',    // Not typically available on chapter pages
    };

    // Get navigation links
    const prevChapter = $('.prev-chapter').attr('href')?.split('/').pop() || null;
    const nextChapter = $('.next-chapter').attr('href')?.split('/').pop() || null;

    return {
      chapterContent: {
        id: chapterId,
        title: $('.chapter-title').text().trim(),
        releaseDate: $('.chapter-release-date').text().trim(),
        content,
      },
      novelInfo,
      prevChapter,
      nextChapter,
    };
  } catch (error) {
    console.error('Error fetching chapter content:', error);
    throw new Error('Failed to fetch chapter content');
  }
}

// Search for novels
export async function searchNovels(query: string): Promise<Novel[]> {
  try {
    const html = await fetchHtml(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(html);
    const novels: Novel[] = [];

    // Adjust selectors based on the actual HTML structure
    $('.novel-item').each((_, element) => {
      const $element = $(element);
      novels.push({
        id: $element.attr('data-id') || '',
        title: $element.find('.novel-title').text().trim(),
        author: $element.find('.novel-author').text().trim(),
        coverImage: $element.find('img').attr('src') || '',
        synopsis: $element.find('.novel-synopsis').text().trim(),
        status: $element.find('.novel-status').text().trim(),
        rating: $element.find('.novel-rating').text().trim(),
      });
    });

    return novels;
  } catch (error) {
    console.error('Error searching novels:', error);
    throw new Error('Failed to search novels');
  }
}