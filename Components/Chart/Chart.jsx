import { createChart, ColorType } from 'lightweight-charts'
import React, { useEffect, useRef } from 'react'

export default function ChartComponent({ data, colors }) {
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
      grid: {
        vertLines: { color: '#5b5959' },
        horzLines: { color: '#5b5959' }
      },
      width: chartContainerRef.current.clientWidth,
      height: 400
    })
    chart.timeScale().fitContent()
    chart.applyOptions({
      crosshair: {
        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          color: 'white',
          labelBackgroundColor: 'white'
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: 'white',
          labelBackgroundColor: 'white'
        }
      }
    })

    const lineSeries = chart.addLineSeries({ color: '#2962FF' })
    lineSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, colors])

  return <div className='chartContainer' ref={chartContainerRef} />
}
