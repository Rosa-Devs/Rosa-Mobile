package com.rosamobile.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.rosamobile.R;

import java.io.File;

import deamon.App;

public class service extends Service {
    private static final String CHANNEL_ID = "MyForegroundServiceChannel";
    private static final int NOTIFICATION_ID = 123;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Create a notification for the foreground service
        createNotificationChannel();
        Notification notification = createNotification();

        // Start the service as a foreground service
        startForeground(NOTIFICATION_ID, notification);

        // Continue your service logic here
        Toast.makeText(this, "Service Started", Toast.LENGTH_LONG).show();

        App app = new App();

        File internalDir = this.getFilesDir();
        app.init(internalDir.toString(), ":8876");

        // Return START_STICKY to ensure the service is restarted if it gets killed
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "Service Destroyed", Toast.LENGTH_LONG).show();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "My Foreground Service Channel";
            String description = "Channel for My Foreground Service";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private Notification createNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.rn_edit_text_material)
                .setContentTitle("My Foreground Service")
                .setContentText("Running in the background")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        return builder.build();
    }
}
