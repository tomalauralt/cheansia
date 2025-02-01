// Mood Tracker Data
let moodData = [];

// Chart Initialization
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Dates will go here
    datasets: [{
      label: 'Mood Over Time',
      data: [], // Mood values will go here
      borderColor: '#3498db',
      fill: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            // Map mood values to emojis
            const emojis = ['😢', '😕', '😐', '🙂', '😊'];
            return emojis[value - 1];
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Display mood value and emoji in tooltip
            const emojis = ['😢 Very Sad', '😕 Sad', '😐 Neutral', '🙂 Happy', '😊 Very Happy'];
            return `Mood: ${emojis[context.raw - 1]}`;
          }
        }
      }
    }
  }
});

// Mood Form Submission
document.getElementById('moodForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const moodValue = parseInt(document.getElementById('mood').value);
  const date = new Date().toLocaleDateString();

  // Add data to chart
  moodData.push({ date, mood: moodValue });
  updateChart();

  // Reset form
  document.getElementById('moodForm').reset();
});

// Update Chart Function
function updateChart() {
  const labels = moodData.map(entry => entry.date);
  const data = moodData.map(entry => entry.mood);

  moodChart.data.labels = labels;
  moodChart.data.datasets[0].data = data;
  moodChart.update();
}