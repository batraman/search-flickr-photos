import Raven from "raven-js"

let ravenUrl = process.env.RAVEN_JS_URL;
let appVersion = process.env.VERSION;

let reportingEnabled = !!ravenUrl && !!appVersion;

export class CrashReporter {
    /**
     * logs error on sentry
     * @param error
     * @param context
     */
    static logException = (error, context) => {
        if (!reportingEnabled) return;
        Raven.captureException(error, {
            extra: context
        });
    };

    /**
     * Initialize error reporter
     */
    static initialize = () => {
        if (!reportingEnabled) return;
        try {
            Raven.config(ravenUrl, {release: appVersion}).install();
        } catch (e) {
        }
    };
}