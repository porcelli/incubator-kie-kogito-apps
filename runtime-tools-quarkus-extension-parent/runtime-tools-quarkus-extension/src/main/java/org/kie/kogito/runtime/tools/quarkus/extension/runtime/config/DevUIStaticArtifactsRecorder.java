package org.kie.kogito.runtime.tools.quarkus.extension.runtime.config;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.runtime.ShutdownContext;
import io.quarkus.runtime.annotations.Recorder;
import io.quarkus.vertx.http.runtime.devmode.FileSystemStaticHandler;
import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

@Recorder
public class DevUIStaticArtifactsRecorder {

    public Handler<RoutingContext> handler(String deploymentArtifactPath, ShutdownContext shutdownContext) {
        List<FileSystemStaticHandler.StaticWebRootConfiguration> webRootConfigurations = new ArrayList<>();
        webRootConfigurations.add(
                new FileSystemStaticHandler.StaticWebRootConfiguration(deploymentArtifactPath, ""));

        FileSystemStaticHandler fileSystemStaticHandler = new FileSystemStaticHandler(webRootConfigurations);

        shutdownContext.addShutdownTask(new ShutdownContext.CloseRunnable(fileSystemStaticHandler));

        return fileSystemStaticHandler;
    }
}
