'use client';
import { useState } from 'react';
import SectionReorder from '@/components/SortableWrapper';
import HeroEditor from '@/components/HeroEditor';
import AboutEditor from '@/components/AboutEditor';
import Feature from '@/components/Feature';
import FooterEditor from '@/components/FooterEdit';

const componentMap: Record<string, React.JSX.Element> = {
  hero: <HeroEditor />,
  about: <AboutEditor />,
  feature: <Feature />,
  footer: <FooterEditor />
};

export default function AdminPage() {
  const [sectionOrder, setSectionOrder] = useState(['hero', 'about', 'feature', 'footer']);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      <SectionReorder onReorder={setSectionOrder} />

      <div className="space-y-6 mt-10">
        {sectionOrder.map(sectionId => (
          <div key={sectionId} className="p-4 border rounded bg-white shadow-md">
            {componentMap[sectionId]}
          </div>
        ))}
      </div>
    </div>
  );
}
