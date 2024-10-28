export const useAboutStore = defineStore('about', () => {
    const myId = ref<string>('0');
    const mySurname = ref<string>('player1');
    const isCreator = ref<boolean>(false);

    function setMyId(id: string) {
        myId.value = id;
    }

    function setMySurname(surname: string) {
        mySurname.value = surname;
    }

    function setCreator(creator: boolean) {
        isCreator.value = creator;
    }

    return {
        myId,
        mySurname,
        setMyId,
        setMySurname,
        setCreator,
    };
});
