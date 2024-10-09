export const handleFirebaseError = (err) => {
    let errorMessage = '';

    switch (err.code) {
        case 'auth/invalid-email':
            errorMessage = 'O e-mail fornecido é inválido.';
            break;
        case 'auth/missing-email':
            errorMessage = 'O e-mail é obrigatório.';
            break;
        case 'auth/missing-password':
            errorMessage = 'A senha é obrigatória.';
            break;
        case 'auth/weak-password':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            break;
        case 'auth/email-already-in-use':
            errorMessage = 'Esse e-mail já está em uso.';
            break;
        case 'auth/user-not-found':
            errorMessage = 'Nenhum usuário encontrado com esse e-mail.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'A senha está incorreta.';
            break;
        case 'auth/operation-not-allowed':
            errorMessage = 'A operação não é permitida.';
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Muitas solicitações. Tente novamente mais tarde.';
            break;
        case 'auth/expired-action-code':
            errorMessage = 'O código de ação expirou.';
            break;
        case 'auth/invalid-action-code':
            errorMessage = 'O código de ação é inválido.';
            break;
        case 'auth/user-disabled':
            errorMessage = 'Esse usuário foi desativado.';
            break;
        case 'auth/credential-already-in-use':
            errorMessage = 'Essa credencial já está em uso.';
            break;
        case 'auth/invalid-credential':
            errorMessage = 'A credencial fornecida é inválida.';
            break;
        default:
            errorMessage = 'Ocorreu um erro. Tente novamente.';
    }

    return errorMessage;
};