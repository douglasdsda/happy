import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import map from '../images/Map.svg';
import '../styles/pages/landing.css';
 import '../styles/pages/orphanagesMap.css';
import 'leaflet/dist/leaflet.css';
 import { Map, TileLayer } from 'react-leaflet';

function OrphanagesMap () {
  return (
    <div id="page-map">
        <aside>
          <header>
            <img src={map} alt="Happy"/>
            <h2>Escolha um orfanado no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>
          </header>

          <footer>
            <strong>Rio do Sul</strong>
            <span>Santa Catarina</span>
          </footer>


        </aside>

        <Map
        center={[-18.9138398,-48.2756055]}
        zoom={15}
        style={{ width: '100%', height: '100%' }} 
        >
          <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>

        <Link to="/" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>  
    </div>
  );
}

export default OrphanagesMap;