'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type CtaButton = {
    text: string;
    link: string;
};

type Content = {
    title: string;
    subtitle: string;
    ctaButtons: CtaButton[];
};

type HeroSection = {
    _id: string;
    sectionName: string;
    content: Content;
    order: number;
};

const Hero = () => {
    const [hero, setHero] = useState<HeroSection | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [responseM, setResponseM] = useState<string>("");

    const getHero = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/get-sections/hero');
            setHero(response.data.section);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseM(error.response?.data.error?.message || "Internal server error");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHero();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!hero) {
        return <div className="text-center py-10">No hero section found!</div>;
    }

    return (
        <>
            { responseM?(<h1>{responseM}</h1>):(<div className="w-full md:w-1/2 flex flex-col items-start justify-center mt-8 md:mt-0 md:ml-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{hero.content.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{hero.content.subtitle}</p>
                {hero.content.ctaButtons.length > 0 && (
                    <Link href={hero.content.ctaButtons[0].link} className="inline-block">
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                            {hero.content.ctaButtons[0].text}
                            <ArrowRight />
                        </button>
                    </Link>
                )}
            </div>)}
        </>
    );
};

export default Hero;
