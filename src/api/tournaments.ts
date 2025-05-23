import { Tournament, TournamentFormData } from '../types/tournament';

// Base API URL with explicit path
const API_URL = import.meta.env.DEV ? '/api/tournaments' : '/api/tournaments';

// Get all tournaments
export const getAllTournaments = async (): Promise<Tournament[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};

// Get tournament by ID
export const getTournamentById = async (id: string): Promise<Tournament> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching tournament with ID ${id}:`, error);
    throw error;
  }
};

// Create new tournament
export const createTournament = async (tournamentData: TournamentFormData): Promise<Tournament> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournamentData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

// Update tournament
export const updateTournament = async (id: string, tournamentData: Partial<Tournament>): Promise<Tournament> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournamentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating tournament with ID ${id}:`, error);
    throw error;
  }
};

// Update match score
export const updateMatchScore = async (
  tournamentId: string, 
  matchId: string, 
  score1: number, 
  score2: number
): Promise<void> => {
  try {
    // First get current tournament data
    const tournament = await getTournamentById(tournamentId);
    
    // Update score for the specified match
    const updatedRounds = tournament.rounds.map(round => {
      const updatedMatches = round.matches.map(match => {
        if (match.id === matchId) {
          return { ...match, score1, score2 };
        }
        return match;
      });
      
      return { ...round, matches: updatedMatches };
    });
    
    // Send updated tournament
    await updateTournament(tournamentId, { rounds: updatedRounds });
  } catch (error) {
    console.error(`Error updating match score for tournament ${tournamentId}, match ${matchId}:`, error);
    throw error;
  }
};

// Delete tournament
export const deleteTournament = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting tournament with ID ${id}:`, error);
    throw error;
  }
};