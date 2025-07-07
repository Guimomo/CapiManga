export const setData = (data) => {

    console.log("setData called");
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
}


export const getData = () => {

    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    };
}

export const Autenticado = () => {
    
    console.log(localStorage.accessToken);
    let token = localStorage.getItem('accessToken');

    if (token) {
        console.log("Token encontrado:", token);
        return true; // El usuario está autenticado
    }else {
        return false; // El usuario no está autenticado
    }
    //return;
}

export const refreshNewToken = async () => {

    const {refreshToken} = getData();

    //const refreshToken = localStorage.getItem('refreshtoken')

    if (!refreshToken) {

        return null;
    }

    try {

        const respuestaRefresh = await fetch('http://localhost:3000/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${refreshToken}`
            }

        });

        if (!respuestaRefresh) {
            
            return null;
        }

        const data = await respuestaRefresh.json();

        console.log("Respuesta del refresh:", data);
        
        if (data.accessToken) {

            localStorage.setItem('refreshToken', data.refreshToken);

            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken);
            }

            return data.accessToken;

        } else {
            return null;
        }
        
    } catch (error) {

        console.error("Error al refrescar el token:", error);
        return null; // returna null en caso de error
    }

}