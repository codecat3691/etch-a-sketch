document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const newGridButton = document.getElementById('new-grid-button');
    const rainbowModeButton = document.getElementById('rainbow-mode');
    const penModeButton = document.getElementById('pen-mode');
    const penColorInput = document.getElementById('pen-color');
    const eraserModeButton = document.getElementById('eraser-mode');
    const clearButton = document.getElementById('clear-button');

    let currentMode = 'pen';
    let penColor = '#000000';
    let isDrawing = false;

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    function createGrid(squaresPerSide) {
        // Clear existing grid
        container.innerHTML = '';

        // Calculate the size of each square
        const squareSize = (600 - (squaresPerSide - 1) * 2) / squaresPerSide;

        // Set container dimensions
        container.style.width = '600px';
        container.style.height = '600px';

        // Create new grid
        for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
            const square = document.createElement('div');
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            container.appendChild(square);

            // Add event listeners for drawing
            square.addEventListener('mousedown', () => {
                isDrawing = true;
                handleColorChange(square);
            });

            square.addEventListener('mouseenter', () => {
                if (isDrawing) {
                    handleColorChange(square);
                }
            });
        }

        // Mouseup event listener on the whole container to stop drawing
        container.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        // Prevent drawing from stopping if mouse leaves the container
        container.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    }

    function handleColorChange(square) {
        if (currentMode === 'rainbow') {
            square.style.backgroundColor = getRandomColor();
        } else if (currentMode === 'pen') {
            square.style.backgroundColor = penColor;
        } else if (currentMode === 'eraser') {
            square.style.backgroundColor = '#ffffff';
        }
    }

    newGridButton.addEventListener('click', () => {
        const squaresPerSide = parseInt(prompt('Enter the number of squares per side for the new grid (max 100):'));
        if (squaresPerSide && squaresPerSide > 0 && squaresPerSide <= 100) {
            createGrid(squaresPerSide);
        } else {
            alert('Please enter a valid number between 1 and 100.');
        }
    });

    rainbowModeButton.addEventListener('click', () => {
        currentMode = 'rainbow';
    });

    penModeButton.addEventListener('click', () => {
        currentMode = 'pen';
    });

    penColorInput.addEventListener('input', (event) => {
        penColor = event.target.value;
    });

    eraserModeButton.addEventListener('click', () => {
        currentMode = 'eraser';
    });

    clearButton.addEventListener('click', () => {
        document.querySelectorAll('.container div').forEach(square => {
            square.style.backgroundColor = '#ffffff';
        });
    });

    // Initial grid
    createGrid(16);
});








