import SystemExtensions

class DriverInstaller: NSObject, OSSystemExtensionRequestDelegate {
    static let queue = DispatchQueue.init(label:"driver_installer")
    let driverID = "id.bulwark.VirtualUSBDriver.driver"
    var requestWait: DispatchSemaphore = DispatchSemaphore.init(value:0)
    func uninstall() {
        print("Requesting uninstall")
        let request = OSSystemExtensionRequest.deactivationRequest(forExtensionWithIdentifier: driverID,
                     queue: DriverInstaller.queue)
        request.delegate = self
        OSSystemExtensionManager.shared.submitRequest(request)
        requestWait.wait()
        print("Done with uninstall")
    }

    func install() {
        print("Requesting install")
        let request = OSSystemExtensionRequest.activationRequest(forExtensionWithIdentifier: driverID,
                     queue: DriverInstaller.queue)
        request.delegate = self
        OSSystemExtensionManager.shared.submitRequest(request)
        requestWait.wait()
        print("Done with install")
    }
    
    func request(_ request: OSSystemExtensionRequest, actionForReplacingExtension existing: OSSystemExtensionProperties, withExtension ext: OSSystemExtensionProperties) -> OSSystemExtensionRequest.ReplacementAction {
        print("requestReplacement")
        return .replace
    }
    
    func requestNeedsUserApproval(_ request: OSSystemExtensionRequest) {
        print("requestNeedsUserApproval")
    }
    
    func request(_ request: OSSystemExtensionRequest, didFinishWithResult result: OSSystemExtensionRequest.Result) {
        print("requestDidFinish:",result)
        requestWait.signal()
    }
    
    func request(_ request: OSSystemExtensionRequest, didFailWithError error: Error) {
        print("requestDidFail:",error)
        requestWait.signal()
    }
}

@_cdecl("install")
public func install() {    
    let installer = DriverInstaller()
    installer.install()
}


