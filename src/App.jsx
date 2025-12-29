// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// React + Vite を想定した最小構成の雛形です
// データは仮で、あとから自由に差し替えできます

import { useState } from "react";

// ---- 仮データ（中身は後で編集） ----
const data = {
  artistA: {
    name: "アーティストA",
    albums: [
      {
        id: "album1",
        title: "アルバム1",
        tracks: [
          { id: "track1", title: "曲1", lyrics: "ここに歌詞" },
          { id: "track2", title: "曲2", lyrics: "ここに歌詞" }
        ]
      }
    ]
  }
};

export default function App() {
  const [artistKey, setArtistKey] = useState(null);
  const [albumId, setAlbumId] = useState(null);
  const [trackId, setTrackId] = useState(null);

  const artist = artistKey ? data[artistKey] : null;
  const album = artist?.albums.find(a => a.id === albumId);
  const track = album?.tracks.find(t => t.id === trackId);

  return (
    <div style={{ padding: 24 }}>
      <h1>歌詞ビューア</h1>

      {/* アーティスト選択 */}
      <h2>アーティスト</h2>
      {Object.entries(data).map(([key, a]) => (
        <button key={key} onClick={() => {
          setArtistKey(key);
          setAlbumId(null);
          setTrackId(null);
        }}>
          {a.name}
        </button>
      ))}

      {/* アルバム選択 */}
      {artist && (
        <>
          <h2>アルバム</h2>
          {artist.albums.map(alb => (
            <button key={alb.id} onClick={() => {
              setAlbumId(alb.id);
              setTrackId(null);
            }}>
              {alb.title}
            </button>
          ))}
        </>
      )}

      {/* 曲選択 */}
      {album && (
        <>
          <h2>曲目</h2>
          <ul>
            {album.tracks.map(t => (
              <li key={t.id}>
                <button onClick={() => setTrackId(t.id)}>{t.title}</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* 歌詞表示 */}
      {track && (
        <>
          <h2>歌詞</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{track.lyrics}</pre>
        </>
      )}
    </div>
  );
}
