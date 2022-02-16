/**
 * fuction of throwing error. It happens only if the CoreModule has been loaded
 * @param parentModule 
 * @param moduleName 
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string){
    if(parentModule){
        throw new Error(`${moduleName} has already been loaded. Import Core Module in te AppModule ONLY.`);
        
    }
}