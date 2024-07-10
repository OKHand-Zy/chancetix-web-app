import React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Shadcn/accordion';

import ErrorBoundary from './error';
import Loading from './loading';

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "ChanceTix",
  description: "About ChanceTix",
}

type Props = {};

function aboutpage({}: Props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <div className="p-20 flex flex-col items-center justify-center text-center ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            關於 ChanceTix
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            我們是一個全新的售票平台，致力於為消費者提供更公平、更便利的購票體驗。
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            這是由一位熱愛看演唱會的工程師打造的，他深知眾多歌迷在購票過程中所遭遇到的種種困擾，因此決心創建一個能夠有效打擊黃牛行為的平台。
          </p>
          <p>
            總的來說，我們的平台致力於為消費者打造一個公平、安全、便利的購票環境，並與廠商和歌手合作，建立起良好的合作關係，共同推動表演產業的發展。
          </p>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 p-10 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            為什麼要選擇我們？
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-start">
            <li>
              <b>多種售票方式：</b>我們提供多種售票方式供廠商選擇，包括
              抽選制度、實名制購票制度、隨機題目購票以及與一般購票。這樣不僅能夠提供更多選擇給消費者，也能有效防止黃牛的囤票行為。
            </li>
            <li>
              <b>嚴格的認證方式：</b>我們使用嚴格的實名制系統。這樣不僅能保護樂迷也能保護廠商，也能有效防止黃牛的行為。
            </li>
            <li>
              <b>官方換票系統：</b>
              我們的官方換票系統能夠有效防止消費者受到黃牛的詐騙。消費者可以放心使用我們的系統進行票卷交換，保障交易安全。
            </li>
            <li>
              <b>實體票卷與電子票卷系統：</b>
              我們提供廠商選擇的實體票卷與電子票卷系統，以滿足不同消費者的需求和喜好。
            </li>
            <li>
              <b>會員優先購票制度：</b>我們未來將盡力爭取與歌手和廠商的 Fans
              Club
              建立一個會員優先購票制度。這樣能夠讓真正的粉絲在第一時間購得票券，同時也能夠促進良好的購票粉絲關係，提升消費者滿意度。
            </li>
          </ul>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default aboutpage;
