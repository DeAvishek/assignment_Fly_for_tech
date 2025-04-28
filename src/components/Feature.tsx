'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const Feature = () => {
  type logo_prop = {
    altText: string,
    link: string 
  }
  type content_prop = {
    logos: logo_prop[]
  }
  type feature_prop = {
    _id: string,
    sectionName: string,
    content: content_prop,
    order: number
  }

  const [feature, setFeature] = useState<feature_prop | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseM, setResponseM] = useState<string>("")

  const getFeature = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/get-sections/feature')
      setFeature(response.data.section)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseM(error.response?.data.error?.message || "Internal server error");
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeature()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      {responseM ? (
        <h1 className="text-red-300">{responseM}</h1>
      ) : (
        <div className="w-full flex flex-col items-center justify-center mt-8">
          <h2 className="text-3xl text-sky-500 font-bold mb-6">Our Featured Logos</h2>
          
          <div className="flex items-center gap-8 overflow-x-auto w-full py-4 px-2">
            {feature?.content.logos && feature.content.logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image 
                  src={logo.link} 
                  alt={logo.altText || "Logo"} 
                  width={300} 
                  height={150}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Feature
