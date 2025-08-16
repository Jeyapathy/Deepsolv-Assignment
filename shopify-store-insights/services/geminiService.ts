
import { GoogleGenAI, Type } from "@google/genai";
import type { ShopifyStoreInsights } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        brandName: { type: Type.STRING, description: "The name of the brand or store." },
        brandContext: { type: Type.STRING, description: "A summary of the 'About Us' or brand story text from the website." },
        productCatalog: {
            type: Type.ARRAY,
            description: "A list of all products found on the store, typically from /products.json.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    vendor: { type: Type.STRING },
                    product_type: { type: Type.STRING },
                    image_url: { type: Type.STRING, description: "A public URL to the primary product image." },
                    url: { type: Type.STRING, description: "A public URL to the product page." },
                }
            }
        },
        heroProducts: {
            type: Type.ARRAY,
            description: "Products prominently featured on the homepage.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    vendor: { type: Type.STRING },
                    product_type: { type: Type.STRING },
                    image_url: { type: Type.STRING, description: "A public URL to the primary product image." },
                    url: { type: Type.STRING, description: "A public URL to the product page." },
                }
            }
        },
        privacyPolicy: { type: Type.STRING, description: "The full text of the privacy policy." },
        refundPolicy: { type: Type.STRING, description: "The full text of the return or refund policy." },
        faqs: {
            type: Type.ARRAY,
            description: "A list of frequently asked questions and their answers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING },
                }
            }
        },
        socialHandles: {
            type: Type.OBJECT,
            properties: {
                instagram: { type: Type.STRING, description: "URL of the Instagram profile." },
                facebook: { type: Type.STRING, description: "URL of the Facebook page." },
                tiktok: { type: Type.STRING, description: "URL of the TikTok profile." },
                twitter: { type: Type.STRING, description: "URL of the Twitter/X profile." },
                pinterest: { type: Type.STRING, description: "URL of the Pinterest profile." },
                youtube: { type: Type.STRING, description: "URL of the YouTube channel." },
            }
        },
        contactDetails: {
            type: Type.OBJECT,
            properties: {
                emails: { type: Type.ARRAY, items: { type: Type.STRING } },
                phone_numbers: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
        },
        importantLinks: {
            type: Type.ARRAY,
            description: "Links like 'Track Order', 'Contact Us', 'Blogs', etc.",
            items: {
                type: Type.OBJECT,
                properties: {
                    text: { type: Type.STRING },
                    url: { type: Type.STRING }
                }
            }
        }
    },
    required: ["brandName", "brandContext", "productCatalog", "heroProducts", "privacyPolicy", "refundPolicy", "faqs", "socialHandles", "contactDetails", "importantLinks"]
};


export const analyzeShopifyStore = async (url: string): Promise<ShopifyStoreInsights> => {
  try {
    const prompt = `
      Please perform a comprehensive analysis of the Shopify store at the following URL: ${url}.
      You must act as an expert web scraper and data analyst.
      Your tasks are:
      1.  Identify the brand name.
      2.  Scrape the homepage to find the "About Us" section or any text describing the brand.
      3.  Access the store's /products.json endpoint to get the full product catalog. If the direct URL doesn't work, find the data through other means. Map the product 'handle' to a full product URL. Map 'featured_image' to 'image_url'.
      4.  Analyze the homepage to identify "hero" or featured products. These are usually in the most prominent sections.
      5.  Locate and extract the full text for the 'Privacy Policy' and 'Return/Refund Policy'.
      6.  Find the FAQ page and extract all question and answer pairs. If no dedicated FAQ page exists, look for Q&A sections on other pages.
      7.  Scan the entire site, especially the header and footer, for social media links (Instagram, Facebook, TikTok, Twitter/X, Pinterest, YouTube).
      8.  Find all contact emails and phone numbers listed on the site.
      9.  Identify other important links such as 'Track Order', 'Contact Us', and 'Blog'.

      Return the collected information strictly in the provided JSON format. Ensure all URLs are absolute.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema,
        }
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);
    return parsedData as ShopifyStoreInsights;

  } catch (error) {
    console.error("Error analyzing Shopify store:", error);
    if (error instanceof Error && error.message.includes('400')) {
         throw new Error(`The provided URL may not be a valid or accessible Shopify store. Please check the URL and try again.`);
    }
    throw new Error("Failed to analyze the Shopify store. The AI model could not process the request.");
  }
};
