import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiList, FiPlus } from "react-icons/fi";
import map from "../images/Map.svg";
import "../styles/pages/landing.css";
import "../styles/pages/orphanagesMap.css";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

function OrphanagesMap() {
  const [sideAtive, setSideAtive] = useState(false);

  const handleAtive = useCallback(() => {
    setSideAtive(!sideAtive);
  }, [sideAtive]);

  const mapIcon = Leaflet.icon({
    iconUrl: map,
    iconSize: [58,68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
  })

  return (
    <div id="page-map" className={sideAtive ? "ative" : ""}>
      <aside className={sideAtive ? "ative" : ""}>
        <div className="icone-list">
          <FiList onClick={handleAtive} size={40} />
        </div>
        <header>
          <img src={map} alt="Happy" />
          <h2>Escolha um orfanado no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Uberlândia</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <aside
        onClick={handleAtive}
        className={sideAtive ? "menu ative" : "menu"}
      >
        <FiList size={25} />
        <strong>Uberlândia</strong>
        <span>Minas Gerais</span>
      </aside>

      <Map
        center={[-18.9138398, -48.2756055]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
        icon={mapIcon}
          position={[-18.9138398, -48.2756055]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240}  className='map-popup'>
              Lar das Meninas
              <Link to="#"><FiArrowRight size={20} color="FFF"  /></Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
