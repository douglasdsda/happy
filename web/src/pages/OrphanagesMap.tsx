import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiList, FiPlus } from "react-icons/fi";
import map from "../images/Map.svg";
import "../styles/pages/landing.css";
import "../styles/pages/orphanagesMap.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
   id:number;
   latitude: number;
   longitude: number;
   name: string;
}

function OrphanagesMap() {
  const [sideAtive, setSideAtive] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const handleAtive = useCallback(() => {
    setSideAtive(!sideAtive);
  }, [sideAtive]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      console.log('orphanages: ', response)
      setOrphanages(response.data);
    }).catch(err => {
      console.log('err: ', err)
    });
  }, []);

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
        {orphanages.map((orphanage) => {
          return (
            <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}>
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
