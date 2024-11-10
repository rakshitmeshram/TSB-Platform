import React, { useRef } from 'react';
import { Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Strategy, BacktestResult } from '../types/trading';

interface ShareReportProps {
  strategy: Strategy;
  results: BacktestResult;
  parameters: Record<string, number>;
  chartRef: React.RefObject<HTMLDivElement>;
}

export default function ShareReport({ strategy, results, parameters, chartRef }: ShareReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current || !chartRef.current) return;

    try {
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;

      // Add title
      pdf.setFontSize(20);
      pdf.text('Trading Strategy Backtest Report', margin, margin);

      // Add strategy details
      pdf.setFontSize(12);
      pdf.text(`Strategy: ${strategy.name}`, margin, margin + 10);
      pdf.text(`Description: ${strategy.description}`, margin, margin + 15);

      // Add parameters
      pdf.text('Parameters:', margin, margin + 25);
      let yOffset = margin + 30;
      strategy.params.forEach(param => {
        pdf.text(`${param.name}: ${parameters[param.key]}`, margin + 5, yOffset);
        yOffset += 5;
      });

      // Add performance metrics
      yOffset += 10;
      pdf.text('Performance Metrics:', margin, yOffset);
      yOffset += 5;
      pdf.text(`Win Rate: ${results.winRate.toFixed(2)}%`, margin + 5, yOffset + 5);
      pdf.text(`Total Profit: $${results.totalProfit.toFixed(2)}`, margin + 5, yOffset + 10);
      pdf.text(`Max Drawdown: $${results.maxDrawdown.toFixed(2)}`, margin + 5, yOffset + 15);
      pdf.text(`Total Trades: ${results.totalTrades}`, margin + 5, yOffset + 20);
      pdf.text(`Profit Factor: ${results.profitFactor.toFixed(2)}`, margin + 5, yOffset + 25);

      // Add chart
      const chartCanvas = await html2canvas(chartRef.current);
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartAspectRatio = chartCanvas.height / chartCanvas.width;
      const chartWidth = pageWidth - (2 * margin);
      const chartHeight = chartWidth * chartAspectRatio;

      pdf.addImage(
        chartImgData,
        'PNG',
        margin,
        yOffset + 35,
        chartWidth,
        chartHeight
      );

      // Add trade list
      if (results.trades.length > 0) {
        pdf.addPage();
        pdf.text('Trade History', margin, margin);
        
        yOffset = margin + 10;
        pdf.setFontSize(10);
        
        results.trades.forEach((trade, index) => {
          if (yOffset > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            yOffset = margin;
          }
          
          const tradeText = `${index + 1}. ${trade.type} - Entry: $${trade.entryPrice.toFixed(2)} (${trade.entryDate}), ` +
                          `Exit: $${trade.exitPrice.toFixed(2)} (${trade.exitDate}), ` +
                          `Profit: $${trade.profit.toFixed(2)}`;
          
          pdf.text(tradeText, margin, yOffset);
          yOffset += 5;
        });
      }

      // Save the PDF
      const fileName = `report_${strategy.name.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center ml-2"
    >
      <Share2 className="h-5 w-5 mr-2" />
      Share Report
    </button>
  );
}