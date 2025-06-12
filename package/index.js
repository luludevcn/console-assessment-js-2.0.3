/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (strippedKeys, objects) => {
    objects.map(object => {
        Object.keys(object).forEach(key => {
            if (strippedKeys.indexOf(key) > -1) {
                delete object[key];
            }
        })
    })
    return objects;
};
exports.excludeByProperty = (prop, objects) => {
    return objects.filter(obj => {
        if (!obj.hasOwnProperty(prop)) {
            return obj;
        }
    })

};
exports.sumDeep = (objects) => {
    return objects.map(obj => {
        if (obj.objects && obj.objects.length > 0) {
            const sum = obj.objects.reduce((acc, cur) =>
                acc + cur.val
                , 0)
            return { 'objects': sum };
        } else {
            return { 'objects': 0 };;
        }
    })
};
exports.applyStatusColor = (colors, statusArr) => {
    const statusColorMap = {};
    Object.entries(colors).forEach(([color, codes]) => {
        codes.forEach(code => {
            statusColorMap[code] = color;
        })
    })
    return statusArr.map(sta => {
        return statusColorMap[sta.status] ? { ...sta, color: statusColorMap[sta.status] } : null
    }).filter(Boolean);
};
exports.createGreeting = (fn, greeting) => {
    return function (name) {
        return fn(greeting, name);
    }
};
exports.setDefaults = (defaults) => {
    return function (user) {
        Object.keys(defaults).forEach(key => {
            if (!user.hasOwnProperty(key)) {
                user[key] = defaults[key]
            }
        })
        return user
    }
};


exports.fetchUserByNameAndUsersCompany = async (name, service) => {
    return await service.fetchUsers().then(async users => {
        const tUser = users.find(user => user.name === name);
        const [company, resStatus] = await Promise.all([service.fetchCompanyById(tUser.companyId), service.fetchStatus()]);
        return { company: company, user: tUser, status: resStatus }

    })
};
