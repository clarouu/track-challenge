interface TrackManager {
  track: Track;
  trackEditor: TrackEditor;
}

interface TrackData {
  id?: string;
  name: string;
  releaseDate: string;
  duration: number;
  artists: string[];
  albumName: string;
}

class TrackList {
  tracks: TrackManager[];

  // #region Private methods
  private addTrack(
    name: string,
    releaseDate: string,
    duration: number,
    artists: string[],
    albumName: string
  ) {
    const track = new Track(name, releaseDate, duration, artists, albumName);
    const trackEditor = new TrackEditor(track);
    this.tracks.push({ track, trackEditor });
  }

  private updateTrack(
    id: string,
    name: string,
    releaseDate: string,
    duration: number,
    artists: string[],
    albumName: string
  ) {
    const trackManager: TrackManager = this.getTrackManager(id);
    if (trackManager) {
      const updatedTrack = trackManager.trackEditor.setAllData(
        name,
        duration,
        releaseDate,
        artists,
        albumName
      );
      trackManager.track = updatedTrack;
    }
  }

  private getTrackManager(id: string): TrackManager {
    const track = this.tracks.filter(
      (currentTrack) => currentTrack.track.id === id
    );
    return track.length === 1 ? track[0] : null;
  }
  // #endregion

  // #region Public methods
  submitTrack(data: TrackData) {
    if (data.id) {
      this.updateTrack(
        data.id,
        data.name,
        data.releaseDate,
        data.duration,
        data.artists,
        data.albumName
      );
    } else {
      this.addTrack(
        data.name,
        data.releaseDate,
        data.duration,
        data.artists,
        data.albumName
      );
    }
  }

  restoreTrack(trackId: string, indexVersion: number) {
    let trackManager = this.getTrackManager(trackId);
    if (trackManager) {
      const restoredVersion =
        trackManager.trackEditor.restoreVersion(indexVersion);
      if (restoredVersion) {
        trackManager.track = restoredVersion;
        return trackManager.track;
      }
    }
    return null;
  }
  // #endregion
}
