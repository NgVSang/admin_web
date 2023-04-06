"use client"; // this is a client component
import React from 'react'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Layout from '@/components/Layout'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>Đây là trang home</div>
  )
}
