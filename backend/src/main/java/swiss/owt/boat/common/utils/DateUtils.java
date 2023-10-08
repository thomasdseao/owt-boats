package swiss.owt.boat.common.utils;

import org.springframework.cglib.core.Local;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {
    public static String formatToDateTime(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }

    public static LocalDateTime formatToLocalDateTime(Date date) {
        // Convert Date to Instant
        Instant instant = date.toInstant();

        // Convert Instant to LocalDateTime
        return instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

}
