// React + Vite 構成（データを JSON に分離）
import { useState } from "react";
import data from "./data.json";

export default function App() {
  const [artistKey, setArtistKey] = useState(null);
  const [albumId, setAlbumId] = useState(null);
  const [trackId, setTrackId] = useState(null);

  const artist = artistKey ? data[artistKey] : null;
  const album = artist?.albums.find(a => a.id === albumId);
  const track = album?.tracks.find(t => t.id === trackId);

  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>まむしCD-R集</h1>

      {/* アーティスト選択 */}
      <h2>アーティスト</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.entries(data).map(([key, a]) => (
          <button key={key} onClick={() => {
            setArtistKey(key);
            setAlbumId(null);
            setTrackId(null);
          }}>
            {a.name}
          </button>
        ))}
      </div>

      {/* アルバム選択 */}
      {artist && (
        <>
          <h2>アルバム</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {artist.albums.map(alb => (
              <button key={alb.id} onClick={() => {
                setAlbumId(alb.id);
                setTrackId(null);
              }}>
                {alb.title}
              </button>
            ))}
          </div>
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
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
            {track.lyrics}
          </pre>
        </>
      )}
    </div>
  );
}
