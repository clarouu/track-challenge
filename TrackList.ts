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
  private addTrack(data: TrackData) {
    const track = new Track(
      data.name,
      data.releaseDate,
      data.duration,
      data.artists,
      data.albumName
    );
    const trackEditor = new TrackEditor(track);
    this.tracks.push({ track, trackEditor });
  }

  private updateTrack(data: TrackData) {
    const trackManager: TrackManager = this.getTrackManager(data.id);
    if (trackManager) {
      const updatedTrack = trackManager.trackEditor.setAllData(
        data.name,
        data.duration,
        data.releaseDate,
        data.artists,
        data.albumName
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
  /**
   * Create or update a track according to data transmitted
   * @param data
   */
  submitTrack(data: TrackData) {
    if (data.id) {
      this.updateTrack(data);
    } else {
      this.addTrack(data);
    }
  }

  /**
   * Restore specific track version and update versions order
   * @param trackId
   * @param indexVersion : track version to restore
   * @returns track or null
   */
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
