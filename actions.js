export const SELECT_WORKSPACE='SELECT_WORKSPACE'

export function selectedWorkspace(projectId) {
    return {
        type:SELECT_WORKSPACE,
        projectId
    };
}