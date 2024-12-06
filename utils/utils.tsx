export  function shuffleArray<T>(array: Array<T>) : Array<T> {
    for( let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j], array[i]]
    }
    return array
}

export function formatTime(time: number){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};