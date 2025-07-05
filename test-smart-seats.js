// Quick test script to verify smart seat suggestion algorithm
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 12;
const occupiedSeats = ['A3', 'A4', 'B7', 'C5', 'C6', 'E8', 'F2', 'G9', 'G10'];
const bestSeats = ['D5', 'D6', 'D7', 'D8', 'E5', 'E6', 'E7', 'E8'];

function getSeatCoordinates(seatId) {
    const row = seatId.charAt(0);
    const seatNumber = parseInt(seatId.slice(1));
    const rowIndex = rows.indexOf(row);
    return { row: rowIndex, seat: seatNumber - 1 };
}

function getSeatScore(seatId, groupSize, preference) {
    const { row, seat } = getSeatCoordinates(seatId);
    let score = 0;

    const centerRow = Math.floor(rows.length / 2);
    const centerSeat = Math.floor(seatsPerRow / 2);
    
    if (preference === 'center') {
        score += 100 - Math.abs(row - centerRow) * 10;
        score += 100 - Math.abs(seat - centerSeat) * 5;
    } else if (preference === 'front') {
        score += 100 - row * 15;
        score += 80 - Math.abs(seat - centerSeat) * 3;
    } else if (preference === 'back') {
        score += 50 + row * 15;
        score += 80 - Math.abs(seat - centerSeat) * 3;
    } else if (preference === 'aisle') {
        if (seat === 0 || seat === seatsPerRow - 1) {
            score += 150;
        } else if (seat === 1 || seat === seatsPerRow - 2) {
            score += 100;
        }
    }

    if (bestSeats.includes(seatId)) {
        score += 50;
    }

    for (const occupiedSeat of occupiedSeats) {
        const occupiedCoords = getSeatCoordinates(occupiedSeat);
        const distance = Math.sqrt(
            Math.pow(row - occupiedCoords.row, 2) + 
            Math.pow(seat - occupiedCoords.seat, 2)
        );
        if (distance < 2) {
            score -= 30;
        }
    }

    return score;
}

function findBestSeatGroup(groupSize, preference) {
    const availableSeats = [];
    
    for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            if (!occupiedSeats.includes(seatId)) {
                availableSeats.push(seatId);
            }
        }
    }

    let bestGroup = [];
    let bestScore = -1;

    for (let i = 0; i <= availableSeats.length - groupSize; i++) {
        const group = [];
        let groupScore = 0;
        let isValidGroup = true;

        for (let j = 0; j < groupSize; j++) {
            const currentSeat = availableSeats[i + j];
            if (!currentSeat) {
                isValidGroup = false;
                break;
            }

            const currentCoords = getSeatCoordinates(currentSeat);
            
            if (j > 0) {
                const prevCoords = getSeatCoordinates(group[j - 1]);
                if (currentCoords.row !== prevCoords.row || 
                    currentCoords.seat !== prevCoords.seat + 1) {
                    isValidGroup = false;
                    break;
                }
            }

            group.push(currentSeat);
            groupScore += getSeatScore(currentSeat, groupSize, preference);
        }

        if (isValidGroup && group.length === groupSize) {
            groupScore += 100;
            
            if (groupScore > bestScore) {
                bestScore = groupScore;
                bestGroup = [...group];
            }
        }
    }

    if (bestGroup.length === 0) {
        const sortedSeats = availableSeats
            .map(seat => ({ seat, score: getSeatScore(seat, groupSize, preference) }))
            .sort((a, b) => b.score - a.score);
        
        bestGroup = sortedSeats.slice(0, groupSize).map(item => item.seat);
    }

    return bestGroup;
}

// Test the algorithm
console.log('Testing Smart Seat Suggestion Algorithm:');
console.log('=====================================');

console.log('\n1. Center preference for 2 seats:');
console.log(findBestSeatGroup(2, 'center'));

console.log('\n2. Front preference for 3 seats:');
console.log(findBestSeatGroup(3, 'front'));

console.log('\n3. Back preference for 4 seats:');
console.log(findBestSeatGroup(4, 'back'));

console.log('\n4. Aisle preference for 1 seat:');
console.log(findBestSeatGroup(1, 'aisle'));

console.log('\n5. Center preference for 6 seats:');
console.log(findBestSeatGroup(6, 'center'));

console.log('\nOccupied seats:', occupiedSeats);
console.log('Best seats:', bestSeats);
