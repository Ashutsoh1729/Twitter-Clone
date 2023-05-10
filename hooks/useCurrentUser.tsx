import useSwr from "swr";
// Now we have to create a new library called fetcher

import fetcher from "@/libs/fetcher";

const currentUser = () => {

    const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }

}

export default currentUser;