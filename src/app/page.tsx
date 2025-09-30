'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EmblaCarousel from '@/components/EmblaCarousel';

const spreads = [
  { 
    key: "single", 
    title: "YES or NO", 
    sub: "简单决策", 
    img: "/card_spread_1.png" 
  },
  { 
    key: "situation-action-outcome", 
    title: "现状行动结果", 
    sub: "过-现-未", 
    img: "/card_spread_3.png" 
  },
  { 
    key: "five-card", 
    title: "五张牌阵", 
    sub: "深度解读", 
    img: "/card_spread_5.png" 
  },
];

export default function DailyTarotEntry() {
  const [spreadType, setSpreadType] = useState<string | null>(null);
  const router = useRouter();

  const handleSpreadSelect = (key: string, index: number) => {
    // 滑到的牌阵即选中
    setSpreadType(key);
  };

  const goToStartWithSpread = (spreadKey: string) => {
    const seed = Math.floor(Math.random() * 1000000);
    const params = new URLSearchParams({
      spread: spreadKey,
      seed: seed.toString(),
      fromDaily: 'true'
    });
    router.push(`/start?${params.toString()}`);
  };

  // Embla Carousel 配置
  const emblaOptions = { 
    align: 'center',
    slidesToScroll: 1,          // 一次滚 1 张
    containScroll: 'keepSnaps', // 不裁剪/合并 snap
    skipSnaps: false,
    loop: true                  // 无限循环
  };



  return (
    <div className="h-dvh relative text-gray-900 overflow-hidden hero">
      {/* 主容器（移动端优先） */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-dvh flex flex-col px-4 md:px-6">
        
        {/* Header: 顶部信息区 */}
        <header className="pt-safe py-5 md:py-8 flex items-start justify-end">
        </header>


        {/* SpreadGrid: 中部牌阵选择区（居中轮播3张卡） */}
        <section className="py-4 md:py-6 h-[46vh] md:h-[52vh] lg:h-[560px] mt-55">
          <div className="-mx-4 md:-mx-6">
            <EmblaCarousel 
              slides={spreads}
              options={emblaOptions}
              onSlideSelect={handleSpreadSelect}
              onSlideClick={(key) => goToStartWithSpread(key)}
              selectedSpread={spreadType}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
