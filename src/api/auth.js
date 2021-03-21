export default function (instance) {
    return {
        PonOntsStatusDetailed(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/private/switcher/module/pon_onts_status_detailed?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/private/switcher/module/pon_onts_status_detailed?ip=' + link)
            }
        },
        PonFDB(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/private/switcher/module/pon_fdb?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/private/switcher/module/pon_fdb?ip=' + link)
            }

        },
        PonOntsGeneralInfo(link, Interface) {
            return instance.get('/private/switcher/module/pon_onts_general_info?ip=' + link + '&interface=' + Interface)
        },
        PonOntsOptical(link, Interface) {
            return instance.get('/private/switcher/module/pon_onts_optical?ip=' + link + '&interface=' + Interface)
        },
        PonInterfaceInfo(link, Interface) {
            return instance.get('/private/switcher/module/pon_interface_info?ip=' + link + '&interface=' + Interface)
        },
        PonOntReboot(link, Interface) {
            return instance.get('/private/switcher/module/pon_ont_reboot?ip=' + link + '&interface=' + Interface)
        },
        PonOntReset(link, Interface) {
            return instance.get('/private/switcher/module/pon_ont_reset?ip=' + link + '&interface=' + Interface)
        },
        PonOntDelete(link, Interface) {
            return instance.get('/private/switcher/module/pon_ont_delete?ip=' + link + '&interface=' + Interface)
        },
    }
}