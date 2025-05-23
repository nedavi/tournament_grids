import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Button from './Button';
import { Tournament } from '../types/tournament';

interface ExportOptionsProps {
  tournament: Tournament;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ tournament }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const exportAsJSON = () => {
    setIsExporting(true);
    try {
      const content = JSON.stringify(tournament, null, 2);
      const filename = `tournament-${tournament.id}-${new Date().toISOString().slice(0, 10)}.json`;
      downloadFile(content, filename, 'application/json');
    } catch (error) {
      console.error('Error exporting as JSON:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsCSV = () => {
    setIsExporting(true);
    try {
      // Преобразуем данные турнира в CSV
      const tournamentData = [
        ['ID', 'Name', 'Type', 'Status', 'Start Date', 'Max Participants'],
        [
          tournament.id, 
          tournament.name, 
          tournament.bracketType, 
          tournament.status, 
          tournament.startDate, 
          tournament.maxParticipants
        ]
      ];
      
      // Добавляем информацию о матчах
      const matchesData = [
        ['Round', 'Match ID', 'Participant 1', 'Participant 2', 'Score 1', 'Score 2']
      ];
      
      tournament.rounds.forEach(round => {
        round.matches.forEach(match => {
          matchesData.push([
            round.name,
            match.id,
            match.participant1 || 'TBD',
            match.participant2 || 'TBD',
            match.score1?.toString() || '',
            match.score2?.toString() || ''
          ]);
        });
      });
      
      // Объединяем данные
      const allData = [
        ['Tournament Info'],
        ...tournamentData,
        [''],
        ['Matches'],
        ...matchesData
      ];
      
      // Преобразуем в CSV
      const csvContent = allData.map(row => row.join(',')).join('\n');
      const filename = `tournament-${tournament.id}-${new Date().toISOString().slice(0, 10)}.csv`;
      
      downloadFile(csvContent, filename, 'text/csv');
    } catch (error) {
      console.error('Error exporting as CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold mb-4">Экспорт данных</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Экспортируйте данные турнира для использования в других приложениях или для резервного копирования.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          onClick={exportAsJSON}
          isLoading={isExporting}
          leftIcon={<Download size={16} />}
        >
          Экспорт в JSON
        </Button>
        
        <Button
          variant="secondary"
          onClick={exportAsCSV}
          isLoading={isExporting}
          leftIcon={<Download size={16} />}
        >
          Экспорт в CSV
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;