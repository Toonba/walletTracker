import { createChart, ColorType } from 'lightweight-charts'
import React, { useEffect, useRef } from 'react'

export default function ChartComponent({data, colors}) {
  
  const chartContainerRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor
      },
      width: chartContainerRef.current.clientWidth,
      height: 300
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({ lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor })
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, colors])

  return <div ref={chartContainerRef} />
}
