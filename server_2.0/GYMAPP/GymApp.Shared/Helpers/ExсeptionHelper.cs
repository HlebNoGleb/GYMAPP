using GymApp.Shared.Exceptions;
using GymApp.Shared.Localization;
using Microsoft.Data.Sqlite;

namespace GymApp.Shared.Helpers;

public static class ExeptionHelper
{
    public static void ThrowDbException(Exception? dbInnerException)
    {
        // Проверка на SQLiteException
        if (dbInnerException is SqliteException sqliteException)
        {
            switch (sqliteException.SqliteExtendedErrorCode)
            {
                case SQLitePCL.raw.SQLITE_CONSTRAINT_UNIQUE: // Уникальное ограничение в SQLite;
                    throw new ValidationException(ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager,"UserAlreadyExists"), dbInnerException);
                default:
                    throw new Exception(ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager,"DefaultDbError"), dbInnerException);
            }
        }
        // Проверка на другие исключения (PostgreSQL и т.д.)
        // Общая обработка ошибок
        throw new Exception(ResourceHelper.GetResource(ResourceHelper.ErrorResourceManager, "DefaultDbError"), dbInnerException);
        
    }
}