
import React from 'react';
import type { ShopifyStoreInsights, Product, FAQ, ImportantLink, SocialHandles } from '../types';
import { InsightCard } from './InsightCard';
import { ProductCard } from './ProductCard';

interface ResultsDisplayProps {
  data: ShopifyStoreInsights;
}

const SocialLink: React.FC<{ platform: keyof SocialHandles; url: string | undefined; }> = ({ platform, url }) => {
    if (!url) return null;
    const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
    return <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline break-all">{capitalizedPlatform}</a>;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
    
  const renderProductGrid = (products: Product[], title: string) => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <InsightCard title={title}>
            {products.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => <ProductCard key={`${product.title}-${index}`} product={product} />)}
                </div>
            ) : <p className="text-slate-500">No products found for this category.</p>}
        </InsightCard>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <InsightCard title={`Brand Overview: ${data.brandName}`}>
          <p className="text-slate-600 whitespace-pre-wrap">{data.brandContext}</p>
        </InsightCard>
      </div>

      <InsightCard title="Contact & Socials">
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-slate-700">Contact Details</h4>
                {data.contactDetails.emails.length > 0 && <p>Email: <a href={`mailto:${data.contactDetails.emails[0]}`} className="text-indigo-600 hover:underline">{data.contactDetails.emails.join(', ')}</a></p>}
                {data.contactDetails.phone_numbers.length > 0 && <p>Phone: {data.contactDetails.phone_numbers.join(', ')}</p>}
                {data.contactDetails.emails.length === 0 && data.contactDetails.phone_numbers.length === 0 && <p className="text-slate-500">No contact details found.</p>}
            </div>
            <div>
                <h4 className="font-semibold text-slate-700">Social Media</h4>
                <div className="flex flex-col space-y-1 mt-1">
                    <SocialLink platform="instagram" url={data.socialHandles.instagram} />
                    <SocialLink platform="facebook" url={data.socialHandles.facebook} />
                    <SocialLink platform="tiktok" url={data.socialHandles.tiktok} />
                    <SocialLink platform="twitter" url={data.socialHandles.twitter} />
                    <SocialLink platform="pinterest" url={data.socialHandles.pinterest} />
                    <SocialLink platform="youtube" url={data.socialHandles.youtube} />
                </div>
            </div>
        </div>
      </InsightCard>

      <InsightCard title="Important Links">
        <ul className="space-y-2">
            {data.importantLinks.map((link: ImportantLink, index: number) => (
                <li key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{link.text}</a>
                </li>
            ))}
        </ul>
      </InsightCard>
      
      <InsightCard title="FAQs">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {data.faqs.length > 0 ? data.faqs.map((faq: FAQ, index: number) => (
                <div key={index}>
                    <p className="font-semibold text-slate-800">{faq.question}</p>
                    <p className="text-slate-600 mt-1">{faq.answer}</p>
                </div>
            )) : <p className="text-slate-500">No FAQs found.</p>}
        </div>
      </InsightCard>

      {renderProductGrid(data.heroProducts, 'Hero Products')}
      {renderProductGrid(data.productCatalog, 'Full Product Catalog')}

      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsightCard title="Privacy Policy">
            <p className="text-slate-600 whitespace-pre-wrap max-h-96 overflow-y-auto pr-2">{data.privacyPolicy || 'Not found.'}</p>
        </InsightCard>
        <InsightCard title="Refund Policy">
            <p className="text-slate-600 whitespace-pre-wrap max-h-96 overflow-y-auto pr-2">{data.refundPolicy || 'Not found.'}</p>
        </InsightCard>
      </div>

    </div>
  );
};
