tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#fff1f2',
                            100: '#ffe4e6',
                            500: '#ef4444',
                            600: '#dc2626',
                            700: '#b91c1c',
                            800: '#991b1b',
                            900: '#7f1d1d',
                            accent: '#ff5722'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        heading: ['Montserrat', 'sans-serif'],
                    }
                }
            }
        }

document.addEventListener('DOMContentLoaded', () => {
// Mobile menu toggle
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });

        // Open a detail card when a brand or category is selected.
        const brandDetails = {
            'Tersuave': 'Pinturas y recubrimientos para proyectos del hogar y de obra. Consultanos por las líneas, colores y presentaciones disponibles.',
            'Terplast': 'Revestimientos texturados y revoques plásticos para proteger y dar terminación a paredes interiores y exteriores.',
            'Polacrin': 'Pinturas para renovar y proteger ambientes. Consultanos por látex, acabados y colores disponibles de la marca.',
            'Casablanca': 'Pinturas látex para paredes y superficies del hogar. Consultanos por opciones para interior o exterior y sus presentaciones.',
            'Doble A': 'Abrasivos y accesorios para preparar superficies y realizar trabajos de pintura. Consultanos por lijas, cintas y otros productos.',
            'Petrilac': 'Productos para proteger y terminar superficies, especialmente madera. Consultanos por líneas y acabados disponibles.',
            'Danzke': 'Protectores y revestimientos para madera, con opciones para distintos usos y terminaciones. Consultanos por disponibilidad.',
            'Sorbalok': 'Pinturas y recubrimientos para distintas superficies. Consultanos por látex, esmaltes y colores disponibles.',
            'Sorbacryl': 'Pinturas acrílicas para proteger y renovar superficies. Consultanos por líneas, colores y presentaciones disponibles.',
            'Zeocar': 'Productos para repintado automotor y preparación de superficies. Consultanos por las opciones disponibles para tu trabajo.',
            'Sikkens': 'Sistemas y productos de pintura para repintado automotor. Consultanos por productos, colores y disponibilidad.',
            'Wanda': 'Pinturas y complementos para repintado automotor. Consultanos por productos y presentaciones disponibles.'
        };
        const categoryDetails = {
            'latex': {
                title: 'L\u00e1tex interior y exterior',
                image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
                alt: 'Ambiente con paredes pintadas',
                description: 'Una referencia visual de c\u00f3mo puede cambiar un ambiente con paredes reci\u00e9n pintadas. En el local te asesoramos para elegir acabado y producto seg\u00fan la superficie.'
            },
            'barnices': {
                title: 'Sint\u00e9ticos y barnices',
                image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
                alt: 'Superficies de madera con terminaci\u00f3n protegida',
                description: 'Mira una referencia de terminaci\u00f3n para madera y superficies. Consulta por esmaltes, protectores y barnices disponibles.'
            },
            'automotriz': {
                title: 'Pintura automotriz',
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
                alt: 'Autom\u00f3vil con acabado brillante',
                description: 'Una referencia de acabado automotor. Consulta por masillas, primers, bases y barnices para tu trabajo.'
            },
            'accesorios': {
                title: 'Abrasivos y accesorios',
                image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=85',
                alt: 'Trabajo de pintura con rodillo',
                description: 'Las herramientas y accesorios ayudan a preparar la superficie y lograr una aplicaci\u00f3n pareja. Consulta por lijas, rodillos, pinceles y cintas.'
            }
        };
        const detailModal = document.getElementById('detailModal');
        const detailImage = document.getElementById('detailImage');
        function showDetail(title, description, image, alt, eyebrow) {
            document.getElementById('detailTitle').textContent = title;
            document.getElementById('detailDescription').textContent = description;
            document.getElementById('detailEyebrow').textContent = eyebrow;
            detailImage.src = image;
            detailImage.alt = alt;
            detailImage.classList.toggle('object-contain', eyebrow === 'Marca y productos');
            detailImage.classList.toggle('object-cover', eyebrow !== 'Marca y productos');
            detailImage.classList.toggle('bg-white', eyebrow === 'Marca y productos');
            const message = `Hola Jorge, quiero consultar por ${title}.`;
            document.getElementById('detailWhatsApp').href = `https://wa.me/5493878673072?text=${encodeURIComponent(message)}`;
            detailModal.classList.remove('hidden');
            detailModal.classList.add('flex');
            document.getElementById('closeDetailModal').focus();
        }
        document.querySelectorAll('[data-brand]').forEach(button => {
            button.addEventListener('click', () => {
                const brand = button.dataset.brand;
                const image = button.querySelector('img').src;
                showDetail(brand, `${brandDetails[brand]} Escribinos para confirmar stock y recibir asesoramiento.`, image, `Logo o productos de la marca ${brand}`, 'Marca y productos');
            });
        });
        document.querySelectorAll('[data-category]').forEach(button => {
            button.addEventListener('click', () => {
                const details = categoryDetails[button.dataset.category];
                showDetail(details.title, details.description, details.image, details.alt, 'Visualizacion de trabajos');
            });
        });
        function closeDetail() {
            detailModal.classList.add('hidden');
            detailModal.classList.remove('flex');
        }
        document.getElementById('closeDetailModal').addEventListener('click', closeDetail);
        detailModal.addEventListener('click', event => {
            if (event.target === detailModal) closeDetail();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !detailModal.classList.contains('hidden')) closeDetail();
        });

        // Paint Calculator
        function calculatePaint() {
            const width = parseFloat(document.getElementById('wallWidth').value) || 0;
            const height = parseFloat(document.getElementById('wallHeight').value) || 0;
            const coats = parseInt(document.getElementById('paintCoats').value) || 2;

            if (width > 0 && height > 0) {
                const area = width * height;
                const totalArea = area * coats;
                const liters = (totalArea / 10).toFixed(1); // Standard ~10m2/L

                document.getElementById('litersOutput').innerText = `${liters} Litros`;
                document.getElementById('calcResult').classList.remove('hidden');

                const waLink = document.getElementById('calcWhatsappLink');
                waLink.href = `https://wa.me/5493878673072?text=Hola%20Jorge!%20CalculÃ©%20que%20necesito%20aproximadamente%20${liters}%20litros%20de%20pintura%20para%20${area}m2%20(${coats}%20manos).%20Â¿Me%20pasÃ¡s%20presupuesto?`;
            }
        }
});

