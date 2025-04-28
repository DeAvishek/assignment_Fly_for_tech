'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import Image from 'next/image'
type image_prop = {
    url: string,
    altText: string
}
type content_prop = {
    introText: string,
    image: image_prop
}
type about_prop = {
    _id: string,
    sectionName: string,
    content: content_prop,
    order: number
}
const About = () => {
    const [about, setabout] = useState<about_prop | null>(null);
    const [loading, setloading] = useState<boolean>(false);
    const [ResponseM, setResponseM] = useState<string>("")
    const getAbout = async () => {
        try {
            setloading(true)
            const response = await axios.get('/api/get-sections/about')
            setabout(response.data.section)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseM(error.response?.data.error?.message || "Internal server error");
            }
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        getAbout()
    }, [])
    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }
    return (
        <>
            {ResponseM ? (
                <h1 className="text-red-500">{ResponseM}</h1>
            ) : (
                <div className="w-full flex flex-col items-center justify-center mt-8 md:mt-0">
                    <h4 className="text-3xl  font-bold text-gray-800 mb-6 text-center">
                        {about?.content.introText}
                    </h4>
                    {about && (
                        <Image
                            src={about.content.image.url}
                            alt={about.content.image.altText || "Image"}
                            width={600}
                            height={400}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default About
