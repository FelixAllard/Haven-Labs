﻿// <auto-generated />
using System;
using Email_Api.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Email_Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250203020935_MigrationV2")]
    partial class MigrationV2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Email_Api.Database.SentEmail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("EmailBody")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EmailSubject")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RecipientEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("SentDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("SentEmails");
                });
#pragma warning restore 612, 618
        }
    }
}
