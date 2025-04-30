'use client'
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';

type CtaButton = { text: string; link: string };
type Content = { title: string; subtitle: string; ctaButtons: CtaButton[] };
type HeroSection = { _id: string; sectionName: string; content: Content; order: number };

const HeroEditor = () => {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseM, setResponseM] = useState<string>('');
  const getHero = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/get-sections/hero');
      setHero(response.data.section);
    } catch (error) {
      if(axios.isAxiosError(error)){
        setResponseM(error.response?.data.error?.message || "Internal server error");
      }
      
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/update-sections/hero', { content: hero?.content });
      await getHero()
      alert("Hero section updated!");
    } catch (error) {
      alert("Failed to update");
      if(axios.isAxiosError(error))
      console.log(error.response?.data.error.message || "Internal server error")
    }
  };

  useEffect(() => {
    getHero();
  }, []);

  if (!hero||loading) return <div>Loading or not found...</div>;

  return (
    <>
    {responseM?(<h2 className='text-red-500'>{responseM}</h2>):(<div className="space-y-4 border p-4 rounded-md shadow">
      <h2 className="text-xl font-semibold">Edit Hero Section</h2>

      <Input
        placeholder="Title"
        value={hero.content.title}
        onChange={(e) =>
          setHero({ ...hero, content: { ...hero.content, title: e.target.value } })
        }
      />

      <Textarea
        placeholder="Subtitle"
        value={hero.content.subtitle}
        onChange={(e) =>
          setHero({ ...hero, content: { ...hero.content, subtitle: e.target.value } })
        }
      />

      <Input
        placeholder="CTA Button Text"
        value={hero.content.ctaButtons[0]?.text || ""}
        onChange={(e) => {
          const updated = [...hero.content.ctaButtons];
          updated[0] = { ...updated[0], text: e.target.value };
          setHero({ ...hero, content: { ...hero.content, ctaButtons: updated } });
        }}
      />

      <Input
        placeholder="CTA Button Link"
        value={hero.content.ctaButtons[0]?.link || ""}
        onChange={(e) => {
          const updated = [...hero.content.ctaButtons];
          updated[0] = { ...updated[0], link: e.target.value };
          setHero({ ...hero, content: { ...hero.content, ctaButtons: updated } });
        }}
      />

      <Button onClick={handleSave} className='hover:cursor-pointer'>Save Hero</Button>
    </div>)}
    </>
  );
};

export default HeroEditor;
