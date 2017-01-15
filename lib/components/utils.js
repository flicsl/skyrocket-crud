export function assertValidNetworkCrudOptions(options) {
    if (options.messageCreated == null)
        throw new Error("No 'messageCreated' found in options.");
    if (options.messageUpdated == null)
        throw new Error("No 'messageUpdated' found in options.");
    if (options.messageDeleted == null)
        throw new Error("No 'messageDeleted' found in options.");
}
