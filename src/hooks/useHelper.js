import {useMemo} from 'react';
import useGun from "./useGun";

const useHelper = () => {
    const {app, gun} = useGun();

    //Search Users
    const searchFriend = (name) => {

        let user;

		app.get("profiles").map().once(ack => {
			if (ack.username.includes(name)){
              user = ack;
              console.log(ack)
            }
        });
        console.log(user);
        return user;
    };
    const getUsers = async () => {
		const friends = await app.get("profiles").map().once().then();
        return friends;
    };

	const actions = useMemo(() => ({
        searchFriend: searchFriend, 
        getUsers: getUsers
    }));
    

    return {actions};
}

export default useHelper;