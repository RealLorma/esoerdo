import * as maplibregl from
    "https://unpkg.com/maplibre-gl@6.14.0/dist/maplibre-gl.mjs";

const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [-35, 5],
    zoom: 1.4,
    minZoom: 0.8,
    maxZoom: 12
});

map.addControl(
    new maplibregl.NavigationControl(),
    "top-right"
);

map.addControl(new maplibregl.GlobeControl());

const places = [
    {
        id: "amazon",
        name: "Amazonas",
        coords: [-60, -3],
        emoji: "🌿",
        animals: "Jaguár, tukán, háromujjú lajhár",
        plants: "Brazildiófa, kaucsukfa, óriási vízililiom",
        description:
            "Dél-Amerika hatalmas trópusi esőerdeje, rendkívül gazdag élővilággal."
    },
    {
        id: "congo",
        name: "Kongó-medence",
        coords: [20, 0],
        emoji: "🦍",
        animals: "Síksági gorilla, okapi, erdei elefánt",
        plants: "Afrikai mahagóni, olajpálmák",
        description:
            "Afrika egyik legnagyobb összefüggő trópusi erdőterülete."
    },
    {
        id: "borneo",
        name: "Borneó",
        coords: [114, 1],
        emoji: "🦧",
        animals: "Orangután, borneói törpeelefánt, orrszarvúmadár",
        plants: "Dipterokarpuszfák, kancsókák",
        description:
            "Délkelet-Ázsia szigete különleges, sok helyen veszélyeztetett élővilággal."
    }
];

const markers = [];
let animalsVisible = true;
let lossVisible = false;

map.on("style.load", () => {
    map.setProjection({ type: "globe" });
});

map.on("load", () => {
    places.forEach(place => {
        const el = document.createElement("div");
        el.className = "map-marker";
        el.textContent = place.emoji;
        el.title = place.name;

        const popupContent = document.createElement("div");
        const heading = document.createElement("h3");
        heading.textContent = place.name;

        const description = document.createElement("p");
        description.textContent = place.description;

        const animals = document.createElement("p");
        animals.textContent = "🐾 Állatok: " + place.animals;

        const plants = document.createElement("p");
        plants.textContent = "🌱 Növények: " + place.plants;

        popupContent.append(
            heading, description, animals, plants
        );

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat(place.coords)
            .setPopup(new maplibregl.Popup({ offset: 18 })
                .setDOMContent(popupContent))
            .addTo(map);

        markers.push({ marker, el, place });
    });

    map.addSource("deforestation-demo", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { name: "Szemléltető zóna – Amazonas" },
                    geometry: {
                        type: "Point",
                        coordinates: [-55, -7]
                    }
                },
                {
                    type: "Feature",
                    properties: { name: "Szemléltető zóna – Kongó-medence" },
                    geometry: {
                        type: "Point",
                        coordinates: [23, -2]
                    }
                },
                {
                    type: "Feature",
                    properties: { name: "Szemléltető zóna – Borneó" },
                    geometry: {
                        type: "Point",
                        coordinates: [116, 1]
                    }
                }
            ]
        }
    });

    map.addLayer({
        id: "deforestation-circles",
        type: "circle",
        source: "deforestation-demo",
        layout: { visibility: "none" },
        paint: {
            "circle-radius": [
                "interpolate", ["linear"], ["zoom"],
                1, 9,
                5, 25
            ],
            "circle-color": "#ff493d",
            "circle-opacity": 0.65,
            "circle-stroke-color": "#ffd4a8",
            "circle-stroke-width": 1.5
        }
    });

    map.on("click", "deforestation-circles", e => {
        const feature = e.features[0];
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setText(feature.properties.name +
                " – szemléltető adat, nem valós mérés.")
            .addTo(map);
    });

    map.on("mouseenter", "deforestation-circles", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "deforestation-circles", () => {
        map.getCanvas().style.cursor = "";
    });
});

document.querySelectorAll("[data-place]").forEach(button => {
    button.addEventListener("click", () => {
        const place = places.find(
            p => p.id === button.dataset.place
        );

        map.flyTo({
            center: place.coords,
            zoom: 4,
            speed: 0.8,
            essential: true
        });

        const item = markers.find(m => m.place.id === place.id);
        if (item) item.marker.togglePopup();
    });
});

document.getElementById("animalsBtn").addEventListener("click", e => {
    animalsVisible = !animalsVisible;

    markers.forEach(({ el }) => {
        el.style.display = animalsVisible ? "" : "none";
    });

    e.currentTarget.classList.toggle("active", animalsVisible);
});

document.getElementById("lossBtn").addEventListener("click", e => {
    lossVisible = !lossVisible;

    if (map.getLayer("deforestation-circles")) {
        map.setLayoutProperty(
            "deforestation-circles",
            "visibility",
            lossVisible ? "visible" : "none"
        );
    }

    e.currentTarget.classList.toggle("active", lossVisible);
});

document.getElementById("homeBtn").addEventListener("click", () => {
    map.flyTo({
        center: [-35, 5],
        zoom: 1.4,
        speed: 0.7
    });
});