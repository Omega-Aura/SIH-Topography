const wrapLabel = (label, maxLength = 16) => {
            if (typeof label !== 'string' || label.length <= maxLength) {
                return label;
            }
            const words = label.split(' ');
            const lines = [];
            let currentLine = '';
            for (const word of words) {
                if ((currentLine + ' ' + word).trim().length > maxLength) {
                    lines.push(currentLine.trim());
                    currentLine = word;
                } else {
                    currentLine = (currentLine + ' ' + word).trim();
                }
            }
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        };
        
        const tooltipTitleCallback = (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
                return label.join(' ');
            } else {
                return label;
            }
        };

        const chartColors = {
            primary: '#0077B6',
            secondary: '#00A9E0',
            tertiary: '#90E0EF',
            background: '#CAF0F8',
            grid: '#e0e0e0',
            text: '#004481'
        };

        const commonChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: chartColors.text,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: tooltipTitleCallback
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: chartColors.grid
                    },
                    ticks: {
                        color: chartColors.text
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: chartColors.text
                    }
                }
            }
        };

        const dataPoints = [
            "12,000 students in Himachal Pradesh have not received scholarships due to Aadhaar linking issues.",
            "In FY 2022-23, 4.24 crore DBT transactions failed due to beneficiary identification issues.",
            "1,983 tribal students in Tripura were rejected due to their Aadhaar not being enabled for DBT.",
            "A CAG audit in Odisha found 77% of beneficiary accounts were not Aadhaar seeded.",
            "A scholarship scam in Himachal Pradesh resulted in multiple FIRs filed by the CBI against fraudulent claims."
        ];
        let currentDataIndex = 0;
        const dataPointElements = [
            document.getElementById('dataPoint1'),
            document.getElementById('dataPoint2'),
            document.getElementById('dataPoint3'),
            document.getElementById('dataPoint4'),
            document.getElementById('dataPoint5')
        ];

        const updateCarousel = () => {
            dataPointElements.forEach(el => {
                if (el) {
                    el.classList.remove('active');
                }
            });
            const currentElement = dataPointElements[currentDataIndex];
            if (currentElement) {
                currentElement.textContent = dataPoints[currentDataIndex];
                currentElement.classList.add('active');
            }
            currentDataIndex = (currentDataIndex + 1) % dataPoints.length;
        };

        window.onload = function() {
            updateCarousel();
            setInterval(updateCarousel, 3000);
        };
        
        const stateWiseData = {
            labels: [
                'Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Bihar', 'Tamil Nadu', 
                'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Gujarat', 'Andhra Pradesh'
            ].map(label => wrapLabel(label)),
            datasets: [{
                label: 'Estimated Affected Students',
                data: [65000, 52000, 48000, 45000, 39000, 35000, 32000, 28000, 25000, 22000],
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1,
                borderRadius: 4
            }]
        };

        const stateWiseChartCtx = document.getElementById('stateWiseImpactChart').getContext('2d');
        new Chart(stateWiseChartCtx, {
            type: 'bar',
            data: stateWiseData,
            options: commonChartOptions
        });

        const aadhaarSeedingData = {
            labels: ['Aadhaar Seeded', 'Not Aadhaar Seeded'],
            datasets: [{
                label: 'Account Seeding Status',
                data: [23, 77],
                backgroundColor: [chartColors.primary, '#E63946'],
                borderColor: ['#FFFFFF'],
                borderWidth: 2
            }]
        };

        const aadhaarSeedingCtx = document.getElementById('aadhaarSeedingStatusChart').getContext('2d');
        new Chart(aadhaarSeedingCtx, {
            type: 'doughnut',
            data: aadhaarSeedingData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                     legend: {
                        position: 'top',
                         labels: {
                            color: chartColors.text,
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                         callbacks: {
                            title: tooltipTitleCallback
                        }
                    }
                }
            }
        });
        
        const dalitDeclineData = {
            labels: ['FY 2022-23', 'FY 2023-24'],
            datasets: [{
                label: 'Beneficiaries (in Lakh)',
                data: [1.36, 0.69],
                backgroundColor: [chartColors.primary, chartColors.secondary],
                borderColor: chartColors.primary,
                borderWidth: 1,
                borderRadius: 4
            }]
        };

        const dalitDeclineCtx = document.getElementById('dalitStudentDeclineChart').getContext('2d');
        new Chart(dalitDeclineCtx, {
            type: 'bar',
            data: dalitDeclineData,
            options: commonChartOptions
        });

        const pendingApplicationsData = {
            labels: [
                'Punjab (2022-23)',
                'Punjab (2023-24)'
            ],
            datasets: [{
                label: 'Pending Applications',
                data: [18896, 18243],
                backgroundColor: [chartColors.primary, chartColors.secondary],
                borderColor: chartColors.primary,
                borderWidth: 1,
                borderRadius: 4
            }]
        };

        const pendingApplicationsCtx = document.getElementById('pendingApplicationsChart').getContext('2d');
        new Chart(pendingApplicationsCtx, {
            type: 'line',
            data: pendingApplicationsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: chartColors.text,
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                         callbacks: {
                            title: tooltipTitleCallback
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Applications',
                            color: chartColors.text
                        },
                        grid: {
                            color: chartColors.grid
                        },
                        ticks: {
                            color: chartColors.text
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartColors.text
                        }
                    }
                }
            }
        });